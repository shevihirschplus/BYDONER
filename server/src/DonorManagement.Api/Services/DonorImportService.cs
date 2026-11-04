using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using DonorManagement.Api.Data;
using DonorManagement.Api.DTOs;
using DonorManagement.Api.Extensions;
using DonorManagement.Api.Models;

namespace DonorManagement.Api.Services;

/// <summary>
/// Imports donors from an Excel (.xlsx) file.
///
/// Expected columns (matched by header text, order-independent, case-insensitive):
///   שם                        -> FullName base (name)
///   תואר                      -> Title (honorific, prepended to FullName)
///   רחוב                      -> street  (combined into FullAddress)
///   מספר בית                  -> house number (combined into FullAddress)
///   מספר דירה או סוויטה        -> apartment/suite (combined into FullAddress)
///   Zipcode                   -> ZipCode
///   Home Phone Number         -> HomePhone
///   Phone Number              -> PhoneNumber
///   Comments                  -> GeneralNotes
///
/// Unknown columns are ignored. A row with no name is skipped.
/// </summary>
public class DonorImportService : IDonorImportService
{
    private readonly AppDbContext _context;

    // Header aliases -> logical field. Compared case-insensitively after trimming.
    private static readonly Dictionary<string, string> HeaderMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["שם"] = "name",
        ["name"] = "name",
        ["תואר"] = "title",
        ["title"] = "title",
        ["רחוב"] = "street",
        ["street"] = "street",
        ["מספר בית"] = "house",
        ["house number"] = "house",
        ["מספר דירה או סוויטה"] = "apartment",
        ["apartment"] = "apartment",
        ["suite"] = "apartment",
        ["zipcode"] = "zip",
        ["zip code"] = "zip",
        ["zip"] = "zip",
        ["home phone number"] = "homePhone",
        ["home phone"] = "homePhone",
        ["phone number"] = "phone",
        ["phone"] = "phone",
        ["comments"] = "notes",
        ["comment"] = "notes",
        ["notes"] = "notes",
    };

    public DonorImportService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DonorImportResult> ImportAsync(Stream excelStream)
    {
        var result = new DonorImportResult();

        // OpenXML needs a seekable stream.
        MemoryStream seekable;
        if (excelStream is MemoryStream ms)
        {
            seekable = ms;
        }
        else
        {
            seekable = new MemoryStream();
            await excelStream.CopyToAsync(seekable);
            seekable.Position = 0;
        }

        using var document = SpreadsheetDocument.Open(seekable, false);
        var workbookPart = document.WorkbookPart
            ?? throw new InvalidOperationException("The uploaded file is not a valid Excel workbook.");

        var sheet = workbookPart.Workbook.Descendants<Sheet>().FirstOrDefault()
            ?? throw new InvalidOperationException("The workbook does not contain any sheets.");

        var worksheetPart = (WorksheetPart)workbookPart.GetPartById(sheet.Id!);
        var sharedStrings = LoadSharedStrings(workbookPart);

        var rows = worksheetPart.Worksheet.GetFirstChild<SheetData>()?.Elements<Row>().ToList()
            ?? new List<Row>();

        if (rows.Count == 0)
        {
            return result;
        }

        // First row = header. Build a column-index -> logical-field map.
        var headerRow = rows[0];
        var columnFields = new Dictionary<int, string>();
        foreach (var cell in headerRow.Elements<Cell>())
        {
            var header = GetCellValue(cell, sharedStrings).Trim();
            if (header.Length == 0) continue;
            if (HeaderMap.TryGetValue(header, out var field))
            {
                columnFields[GetColumnIndex(cell.CellReference!)] = field;
            }
        }

        var donorsToAdd = new List<Donor>();

        for (var r = 1; r < rows.Count; r++)
        {
            result.TotalRows++;
            var values = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

            foreach (var cell in rows[r].Elements<Cell>())
            {
                var colIndex = GetColumnIndex(cell.CellReference!);
                if (!columnFields.TryGetValue(colIndex, out var field)) continue;
                var value = GetCellValue(cell, sharedStrings).Trim();
                if (value.Length > 0)
                {
                    values[field] = value;
                }
            }

            var request = BuildDonorRequest(values);
            if (request == null)
            {
                result.Skipped++;
                result.Errors.Add($"Row {r + 1}: skipped (no name found).");
                continue;
            }

            donorsToAdd.Add(request.ToEntity());
        }

        if (donorsToAdd.Count > 0)
        {
            _context.Donors.AddRange(donorsToAdd);
            await _context.SaveChangesAsync();
        }

        result.Imported = donorsToAdd.Count;
        return result;
    }

    private static CreateDonorRequest? BuildDonorRequest(IReadOnlyDictionary<string, string> values)
    {
        values.TryGetValue("name", out var name);
        if (string.IsNullOrWhiteSpace(name))
        {
            return null;
        }

        values.TryGetValue("title", out var title);
        values.TryGetValue("street", out var street);
        values.TryGetValue("house", out var house);
        values.TryGetValue("apartment", out var apartment);
        values.TryGetValue("zip", out var zip);
        values.TryGetValue("homePhone", out var homePhone);
        values.TryGetValue("phone", out var phone);
        values.TryGetValue("notes", out var notes);

        // Full name = title + name (name column already holds the person's name).
        var fullName = string.Join(" ",
            new[] { title, name }.Where(s => !string.IsNullOrWhiteSpace(s)));

        // Combine street / house number / apartment into one address string.
        var addressParts = new List<string>();
        if (!string.IsNullOrWhiteSpace(street)) addressParts.Add(street.Trim());
        if (!string.IsNullOrWhiteSpace(house)) addressParts.Add(house.Trim());
        if (!string.IsNullOrWhiteSpace(apartment)) addressParts.Add($"#{apartment.Trim()}");
        var fullAddress = addressParts.Count > 0 ? string.Join(" ", addressParts) : null;

        return new CreateDonorRequest
        {
            FullName = fullName,
            Title = NullIfEmpty(title),
            FirstName = null,
            LastName = null,
            SpouseName = null,
            Birthdate = null,
            Email = string.Empty,
            PhoneNumber = NullIfEmpty(phone) ?? string.Empty,
            HomePhone = NullIfEmpty(homePhone),
            CellPhone = null,
            WorkPhone = null,
            GeneralNotes = NullIfEmpty(notes),
            Country = null,
            City = null,
            ZipCode = NullIfEmpty(zip),
            Location = null,
            FullAddress = fullAddress,
            FamilyStatus = null,
            NumberOfKids = 0
        };
    }

    private static string? NullIfEmpty(string? value)
        => string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static Dictionary<int, string> LoadSharedStrings(WorkbookPart workbookPart)
    {
        var result = new Dictionary<int, string>();
        var sharedStringPart = workbookPart.SharedStringTablePart;
        if (sharedStringPart?.SharedStringTable == null)
        {
            return result;
        }

        var index = 0;
        foreach (var item in sharedStringPart.SharedStringTable.Elements<SharedStringItem>())
        {
            result[index++] = item.InnerText;
        }
        return result;
    }

    private static string GetCellValue(Cell cell, IReadOnlyDictionary<int, string> sharedStrings)
    {
        if (cell.CellValue == null)
        {
            // Inline string fallback.
            return cell.InnerText ?? string.Empty;
        }

        var raw = cell.CellValue.InnerText;

        if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
        {
            if (int.TryParse(raw, out var idx) && sharedStrings.TryGetValue(idx, out var text))
            {
                return text;
            }
            return string.Empty;
        }

        return raw;
    }

    /// <summary>Converts a cell reference like "C5" to a 1-based column index (C -> 3).</summary>
    private static int GetColumnIndex(string cellReference)
    {
        var columnPart = new string(cellReference.TakeWhile(char.IsLetter).ToArray());
        var index = 0;
        foreach (var ch in columnPart)
        {
            index = index * 26 + (char.ToUpperInvariant(ch) - 'A' + 1);
        }
        return index;
    }
}

namespace DonorManagement.Api.DTOs;

/// <summary>
/// Summary returned after a bulk donor Excel import.
/// </summary>
public class DonorImportResult
{
    /// <summary>Number of data rows found in the sheet (excluding the header).</summary>
    public int TotalRows { get; set; }

    /// <summary>Number of donors successfully created.</summary>
    public int Imported { get; set; }

    /// <summary>Rows that were skipped (e.g. completely empty or missing a name).</summary>
    public int Skipped { get; set; }

    /// <summary>Human-readable messages describing skipped rows or problems.</summary>
    public List<string> Errors { get; set; } = new();
}

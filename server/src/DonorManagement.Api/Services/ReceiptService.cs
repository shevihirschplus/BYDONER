using DonorManagement.Api.Configuration;
using DonorManagement.Api.Data;
using DonorManagement.Api.Exceptions;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using WordDocument = DocumentFormat.OpenXml.Wordprocessing.Document;

namespace DonorManagement.Api.Services;

public class ReceiptService : IReceiptService
{
    private readonly AppDbContext _context;
    private readonly InstitutionSettings _institutionSettings;

    public ReceiptService(AppDbContext context, IOptions<InstitutionSettings> institutionSettings)
    {
        _context = context;
        _institutionSettings = institutionSettings.Value;
    }

    public async Task<byte[]> GeneratePdfAsync(Guid donationId)
    {
        var donation = await _context.Donations
            .Include(d => d.Donor)
            .FirstOrDefaultAsync(d => d.Id == donationId);

        if (donation == null)
        {
            throw new NotFoundException("Donation", donationId);
        }

        var document = QuestPDF.Fluent.Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(50);
                page.DefaultTextStyle(x => x.FontSize(12));

                page.Header().Column(column =>
                {
                    column.Item().Text(_institutionSettings.Name)
                        .FontSize(20).Bold().FontColor(Colors.Blue.Darken2);
                    column.Item().Text(_institutionSettings.Address).FontSize(10);
                    column.Item().Text($"Phone: {_institutionSettings.Phone} | Email: {_institutionSettings.Email}")
                        .FontSize(10);
                    column.Item().PaddingVertical(10).LineHorizontal(1);
                });

                page.Content().PaddingVertical(20).Column(column =>
                {
                    column.Item().Text("Donation Receipt").FontSize(16).Bold();
                    column.Item().PaddingTop(10);

                    column.Item().Text($"Receipt Number: {donation.ReceiptNumber}").Bold();
                    column.Item().Text($"Date: {donation.DonationDate:MMMM dd, yyyy}");
                    column.Item().PaddingTop(15);

                    column.Item().Text("Donor Information").FontSize(14).Bold();
                    column.Item().Text($"Name: {donation.Donor.FullName}");
                    column.Item().Text($"Email: {donation.Donor.Email}");
                    column.Item().Text($"Phone: {donation.Donor.PhoneNumber}");
                    if (!string.IsNullOrEmpty(donation.Donor.FullAddress))
                    {
                        column.Item().Text($"Address: {donation.Donor.FullAddress}");
                    }
                    column.Item().PaddingTop(15);

                    column.Item().Text("Donation Details").FontSize(14).Bold();
                    column.Item().Text($"Amount: {donation.Amount:N2} {donation.Currency}");
                    column.Item().Text($"Payment Method: {donation.PaymentMethod}");
                    if (!string.IsNullOrEmpty(donation.Notes))
                    {
                        column.Item().Text($"Notes: {donation.Notes}");
                    }
                });

                page.Footer().Column(column =>
                {
                    column.Item().LineHorizontal(1);
                    column.Item().PaddingTop(10).Text(_institutionSettings.ThankYouMessage)
                        .Italic().FontColor(Colors.Grey.Darken1);
                });
            });
        });

        return document.GeneratePdf();
    }

    public async Task<byte[]> GenerateDocxAsync(Guid donationId)
    {
        var donation = await _context.Donations
            .Include(d => d.Donor)
            .FirstOrDefaultAsync(d => d.Id == donationId);

        if (donation == null)
        {
            throw new NotFoundException("Donation", donationId);
        }

        using var stream = new MemoryStream();
        using (var wordDocument = WordprocessingDocument.Create(stream, WordprocessingDocumentType.Document))
        {
            var mainPart = wordDocument.AddMainDocumentPart();
            mainPart.Document = new WordDocument();
            var body = mainPart.Document.AppendChild(new Body());

            // Institution header
            AddParagraph(body, _institutionSettings.Name, bold: true, fontSize: 28);
            AddParagraph(body, _institutionSettings.Address, fontSize: 18);
            AddParagraph(body, $"Phone: {_institutionSettings.Phone} | Email: {_institutionSettings.Email}", fontSize: 18);
            AddParagraph(body, "");

            // Receipt title
            AddParagraph(body, "Donation Receipt", bold: true, fontSize: 24);
            AddParagraph(body, "");

            // Receipt info
            AddParagraph(body, $"Receipt Number: {donation.ReceiptNumber}", bold: true);
            AddParagraph(body, $"Date: {donation.DonationDate:MMMM dd, yyyy}");
            AddParagraph(body, "");

            // Donor info
            AddParagraph(body, "Donor Information", bold: true, fontSize: 22);
            AddParagraph(body, $"Name: {donation.Donor.FullName}");
            AddParagraph(body, $"Email: {donation.Donor.Email}");
            AddParagraph(body, $"Phone: {donation.Donor.PhoneNumber}");
            if (!string.IsNullOrEmpty(donation.Donor.FullAddress))
            {
                AddParagraph(body, $"Address: {donation.Donor.FullAddress}");
            }
            AddParagraph(body, "");

            // Donation details
            AddParagraph(body, "Donation Details", bold: true, fontSize: 22);
            AddParagraph(body, $"Amount: {donation.Amount:N2} {donation.Currency}");
            AddParagraph(body, $"Payment Method: {donation.PaymentMethod}");
            if (!string.IsNullOrEmpty(donation.Notes))
            {
                AddParagraph(body, $"Notes: {donation.Notes}");
            }
            AddParagraph(body, "");

            // Footer
            AddParagraph(body, _institutionSettings.ThankYouMessage, italic: true);
        }

        return stream.ToArray();
    }

    private static void AddParagraph(Body body, string text, bool bold = false, bool italic = false, int fontSize = 20)
    {
        var paragraph = new Paragraph();
        var run = new Run();
        var runProperties = new RunProperties();

        if (bold)
        {
            runProperties.AppendChild(new Bold());
        }

        if (italic)
        {
            runProperties.AppendChild(new Italic());
        }

        runProperties.AppendChild(new FontSize { Val = fontSize.ToString() });

        run.AppendChild(runProperties);
        run.AppendChild(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
        paragraph.AppendChild(run);
        body.AppendChild(paragraph);
    }
}

using DonorManagement.Api.Configuration;
using DonorManagement.Api.Data;
using DonorManagement.Api.Exceptions;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;
using DonorManagement.Api.Services;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DonorManagement.UnitTests.Services;

public class ReceiptServiceDocxTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly ReceiptService _service;
    private readonly InstitutionSettings _settings;

    public ReceiptServiceDocxTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);

        _settings = new InstitutionSettings
        {
            Name = "Test Organization",
            Address = "123 Test St, Test City",
            Phone = "+1-555-1234",
            Email = "info@testorg.com",
            ThankYouMessage = "Thank you for your generous donation!"
        };

        var optionsMock = Options.Create(_settings);
        _service = new ReceiptService(_context, optionsMock);
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    private async Task<Donation> SeedDonationWithDonor()
    {
        var donor = new Donor
        {
            Id = Guid.NewGuid(),
            FullName = "Jane Smith",
            Email = "jane@example.com",
            PhoneNumber = "+1-555-9876",
            FullAddress = "456 Oak Ave, Springfield",
            Country = "USA",
            City = "Springfield",
            Location = "Downtown",
            FamilyStatus = FamilyStatus.Married,
            NumberOfKids = 2,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var donation = new Donation
        {
            Id = Guid.NewGuid(),
            DonorId = donor.Id,
            Amount = 250.00m,
            DonationDate = new DateOnly(2024, 6, 15),
            PaymentMethod = PaymentMethod.CreditCard,
            ReceiptNumber = "RCP-2024-001",
            Notes = "Annual contribution",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Donor = donor
        };

        _context.Donors.Add(donor);
        _context.Donations.Add(donation);
        await _context.SaveChangesAsync();

        return donation;
    }

    [Fact]
    public async Task GenerateDocxAsync_ShouldReturnValidDocxBytes()
    {
        var donation = await SeedDonationWithDonor();

        var result = await _service.GenerateDocxAsync(donation.Id);

        Assert.NotNull(result);
        Assert.True(result.Length > 0);

        // Verify it's a valid .docx by opening it
        using var stream = new MemoryStream(result);
        using var doc = WordprocessingDocument.Open(stream, false);
        Assert.NotNull(doc.MainDocumentPart);
        Assert.NotNull(doc.MainDocumentPart.Document);
    }

    [Fact]
    public async Task GenerateDocxAsync_ShouldContainInstitutionInfo()
    {
        var donation = await SeedDonationWithDonor();

        var result = await _service.GenerateDocxAsync(donation.Id);
        var text = ExtractAllText(result);

        Assert.Contains(_settings.Name, text);
        Assert.Contains(_settings.Address, text);
        Assert.Contains(_settings.Phone, text);
        Assert.Contains(_settings.Email, text);
    }

    [Fact]
    public async Task GenerateDocxAsync_ShouldContainDonorInfo()
    {
        var donation = await SeedDonationWithDonor();

        var result = await _service.GenerateDocxAsync(donation.Id);
        var text = ExtractAllText(result);

        Assert.Contains("Jane Smith", text);
        Assert.Contains("456 Oak Ave, Springfield", text);
        Assert.Contains("jane@example.com", text);
        Assert.Contains("+1-555-9876", text);
    }

    [Fact]
    public async Task GenerateDocxAsync_ShouldContainDonationInfo()
    {
        var donation = await SeedDonationWithDonor();

        var result = await _service.GenerateDocxAsync(donation.Id);
        var text = ExtractAllText(result);

        Assert.Contains("RCP-2024-001", text);
        Assert.Contains("CreditCard", text);
        // Date is formatted with donation.DonationDate.ToString("MMMM dd, yyyy")
        Assert.Contains("2024", text);
        Assert.Contains("250", text);
    }

    [Fact]
    public async Task GenerateDocxAsync_ShouldContainFooter()
    {
        var donation = await SeedDonationWithDonor();

        var result = await _service.GenerateDocxAsync(donation.Id);
        var text = ExtractAllText(result);

        Assert.Contains(_settings.ThankYouMessage, text);
        Assert.Contains("Authorized Signature", text);
    }

    [Fact]
    public async Task GenerateDocxAsync_ShouldThrowNotFoundException_WhenDonationNotFound()
    {
        var nonExistentId = Guid.NewGuid();

        await Assert.ThrowsAsync<NotFoundException>(
            () => _service.GenerateDocxAsync(nonExistentId));
    }

    private static string ExtractAllText(byte[] docxBytes)
    {
        using var stream = new MemoryStream(docxBytes);
        using var doc = WordprocessingDocument.Open(stream, false);
        var body = doc.MainDocumentPart!.Document.Body!;
        return body.InnerText;
    }
}

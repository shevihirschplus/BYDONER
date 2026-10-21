using DonorManagement.Api.Data;
using DonorManagement.Api.DTOs;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;
using DonorManagement.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace DonorManagement.UnitTests.Services;

public class DonorServiceSearchTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly DonorService _service;

    public DonorServiceSearchTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _service = new DonorService(_context);
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    private async Task SeedDonorsWithDonations()
    {
        var donor1 = new Donor
        {
            Id = Guid.NewGuid(),
            FullName = "Alice Johnson",
            Email = "alice@example.com",
            PhoneNumber = "+1-555-0100",
            Country = "USA",
            City = "New York",
            Location = "Manhattan",
            FullAddress = "123 Main St",
            FamilyStatus = FamilyStatus.Single,
            NumberOfKids = 0,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var donor2 = new Donor
        {
            Id = Guid.NewGuid(),
            FullName = "Bob Smith",
            Email = "bob@company.org",
            PhoneNumber = "+1-555-0200",
            Country = "Canada",
            City = "Toronto",
            Location = "Downtown",
            FullAddress = "456 Oak Ave",
            FamilyStatus = FamilyStatus.Married,
            NumberOfKids = 2,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var donor3 = new Donor
        {
            Id = Guid.NewGuid(),
            FullName = "Charlie Brown",
            Email = "charlie@test.net",
            PhoneNumber = "+44-20-7946-0958",
            Country = "UK",
            City = "London",
            Location = "Westminster",
            FullAddress = "789 High St",
            FamilyStatus = FamilyStatus.Divorced,
            NumberOfKids = 1,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Donors.AddRange(donor1, donor2, donor3);

        // Donations for donor1
        _context.Donations.Add(new Donation
        {
            Id = Guid.NewGuid(),
            DonorId = donor1.Id,
            Amount = 100m,
            DonationDate = new DateOnly(2024, 3, 15),
            PaymentMethod = PaymentMethod.Cash,
            ReceiptNumber = "RCP-2024-001",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });

        // Donations for donor2
        _context.Donations.Add(new Donation
        {
            Id = Guid.NewGuid(),
            DonorId = donor2.Id,
            Amount = 500m,
            DonationDate = new DateOnly(2024, 6, 1),
            PaymentMethod = PaymentMethod.BankTransfer,
            ReceiptNumber = "RCP-2024-002",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });

        // Donations for donor3
        _context.Donations.Add(new Donation
        {
            Id = Guid.NewGuid(),
            DonorId = donor3.Id,
            Amount = 250m,
            DonationDate = new DateOnly(2024, 1, 10),
            PaymentMethod = PaymentMethod.CreditCard,
            ReceiptNumber = "RCP-2024-003",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
    }

    [Fact]
    public async Task SearchAsync_NoFilters_ReturnsAllDonors()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter(null, null, null, null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(3, result.TotalCount);
        Assert.Equal(3, result.Items.Count);
    }

    [Fact]
    public async Task SearchAsync_QueryByFullName_ReturnMatchingDonors()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter("alice", null, null, null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Alice Johnson", result.Items[0].FullName);
    }

    [Fact]
    public async Task SearchAsync_QueryByEmail_ReturnMatchingDonors()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter("company.org", null, null, null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Bob Smith", result.Items[0].FullName);
    }

    [Fact]
    public async Task SearchAsync_QueryByPhoneNumber_ReturnMatchingDonors()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter("7946", null, null, null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Charlie Brown", result.Items[0].FullName);
    }

    [Fact]
    public async Task SearchAsync_QueryIsCaseInsensitive()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter("ALICE", null, null, null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Alice Johnson", result.Items[0].FullName);
    }

    [Fact]
    public async Task SearchAsync_FilterByFamilyStatus_ReturnsMatchingDonors()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter(null, FamilyStatus.Married, null, null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Bob Smith", result.Items[0].FullName);
    }

    [Fact]
    public async Task SearchAsync_FilterByLocation_SearchesLocationCountryCity()
    {
        await SeedDonorsWithDonations();

        // Search by country
        var filter = new DonorSearchFilter(null, null, "Canada", null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Bob Smith", result.Items[0].FullName);

        // Search by city
        filter = new DonorSearchFilter(null, null, "London", null, null, null, null);
        result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Charlie Brown", result.Items[0].FullName);

        // Search by location field
        filter = new DonorSearchFilter(null, null, "Manhattan", null, null, null, null);
        result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Alice Johnson", result.Items[0].FullName);
    }

    [Fact]
    public async Task SearchAsync_FilterByMinAmount_ReturnsDonorsWithDonationAboveMin()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter(null, null, null, 200m, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(2, result.TotalCount);
        Assert.Contains(result.Items, d => d.FullName == "Bob Smith");
        Assert.Contains(result.Items, d => d.FullName == "Charlie Brown");
    }

    [Fact]
    public async Task SearchAsync_FilterByMaxAmount_ReturnsDonorsWithDonationBelowMax()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter(null, null, null, null, 150m, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Alice Johnson", result.Items[0].FullName);
    }

    [Fact]
    public async Task SearchAsync_FilterByDateRange_ReturnsDonorsWithDonationsInRange()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter(null, null, null, null, null,
            new DateOnly(2024, 3, 1), new DateOnly(2024, 4, 1));
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Alice Johnson", result.Items[0].FullName);
    }

    [Fact]
    public async Task SearchAsync_CombinedFilters_UsesAndLogic()
    {
        await SeedDonorsWithDonations();

        // Query + FamilyStatus: "bob" AND Married
        var filter = new DonorSearchFilter("bob", FamilyStatus.Married, null, null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(1, result.TotalCount);
        Assert.Equal("Bob Smith", result.Items[0].FullName);

        // Query + FamilyStatus that don't match: "alice" AND Married -> no results
        filter = new DonorSearchFilter("alice", FamilyStatus.Married, null, null, null, null, null);
        result = await _service.SearchAsync(filter);

        Assert.Equal(0, result.TotalCount);
    }

    [Fact]
    public async Task SearchAsync_Pagination_ReturnsCorrectPage()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter(null, null, null, null, null, null, null, Page: 1, PageSize: 2);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(3, result.TotalCount);
        Assert.Equal(2, result.Items.Count);
        Assert.Equal(1, result.Page);
        Assert.Equal(2, result.PageSize);

        // Second page
        filter = new DonorSearchFilter(null, null, null, null, null, null, null, Page: 2, PageSize: 2);
        result = await _service.SearchAsync(filter);

        Assert.Equal(3, result.TotalCount);
        Assert.Single(result.Items);
        Assert.Equal(2, result.Page);
    }

    [Fact]
    public async Task SearchAsync_NoMatchingResults_ReturnsEmptyList()
    {
        await SeedDonorsWithDonations();

        var filter = new DonorSearchFilter("nonexistent", null, null, null, null, null, null);
        var result = await _service.SearchAsync(filter);

        Assert.Equal(0, result.TotalCount);
        Assert.Empty(result.Items);
    }
}

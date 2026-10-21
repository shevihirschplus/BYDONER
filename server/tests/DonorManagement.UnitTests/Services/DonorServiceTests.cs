using DonorManagement.Api.Data;
using DonorManagement.Api.DTOs;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;
using DonorManagement.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace DonorManagement.UnitTests.Services;

public class DonorServiceTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly DonorService _service;

    public DonorServiceTests()
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

    [Fact]
    public async Task CreateAsync_ShouldCreateDonorWithUniqueId()
    {
        var request = new CreateDonorRequest(
            FullName: "John Doe",
            Birthdate: new DateOnly(1990, 5, 15),
            Email: "john@example.com",
            PhoneNumber: "+1-555-0100",
            Country: "USA",
            City: "New York",
            Location: "Manhattan",
            FullAddress: "123 Main St",
            FamilyStatus: FamilyStatus.Single,
            NumberOfKids: 0
        );

        var result = await _service.CreateAsync(request);

        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal("John Doe", result.FullName);
        Assert.Equal("john@example.com", result.Email);
        Assert.Equal("+1-555-0100", result.PhoneNumber);
        Assert.Equal(FamilyStatus.Single, result.FamilyStatus);
        Assert.Equal(0, result.NumberOfKids);
    }

    [Fact]
    public async Task CreateAsync_ShouldPersistDonorToDatabase()
    {
        var request = new CreateDonorRequest(
            FullName: "Jane Smith",
            Birthdate: null,
            Email: "jane@example.com",
            PhoneNumber: "555-0200",
            Country: null,
            City: null,
            Location: null,
            FullAddress: null,
            FamilyStatus: FamilyStatus.Married,
            NumberOfKids: 2
        );

        var result = await _service.CreateAsync(request);

        var donor = await _context.Donors.FindAsync(result.Id);
        Assert.NotNull(donor);
        Assert.Equal("Jane Smith", donor.FullName);
        Assert.Equal("jane@example.com", donor.Email);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnDonorWithDonations()
    {
        var donor = new Donor
        {
            Id = Guid.NewGuid(),
            FullName = "Test Donor",
            Email = "test@example.com",
            PhoneNumber = "555-0300",
            Country = "Canada",
            City = "Toronto",
            Location = "Downtown",
            FullAddress = "456 Oak Ave",
            FamilyStatus = FamilyStatus.Married,
            NumberOfKids = 1,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var donation = new Donation
        {
            Id = Guid.NewGuid(),
            DonorId = donor.Id,
            Amount = 100.50m,
            DonationDate = new DateOnly(2024, 1, 15),
            Notes = "Test donation",
            PaymentMethod = PaymentMethod.Cash,
            ReceiptNumber = "RCP-2024-001",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Donors.Add(donor);
        _context.Donations.Add(donation);
        await _context.SaveChangesAsync();

        var result = await _service.GetByIdAsync(donor.Id);

        Assert.NotNull(result);
        Assert.Equal(donor.Id, result.Id);
        Assert.Equal("Test Donor", result.FullName);
        Assert.Single(result.Donations);
        Assert.Equal(100.50m, result.Donations[0].Amount);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnNullForNonExistentDonor()
    {
        var result = await _service.GetByIdAsync(Guid.NewGuid());

        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdateDonorFields()
    {
        var donor = new Donor
        {
            Id = Guid.NewGuid(),
            FullName = "Original Name",
            Email = "original@example.com",
            PhoneNumber = "555-0400",
            Country = "USA",
            City = "Boston",
            Location = "Suburb",
            FullAddress = "789 Pine Rd",
            FamilyStatus = FamilyStatus.Single,
            NumberOfKids = 0,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Donors.Add(donor);
        await _context.SaveChangesAsync();

        var updateRequest = new UpdateDonorRequest(
            FullName: "Updated Name",
            Birthdate: new DateOnly(1985, 3, 20),
            Email: "updated@example.com",
            PhoneNumber: "555-0500",
            Country: "Canada",
            City: "Vancouver",
            Location: "Downtown",
            FullAddress: "321 Elm St",
            FamilyStatus: FamilyStatus.Married,
            NumberOfKids: 3
        );

        var result = await _service.UpdateAsync(donor.Id, updateRequest);

        Assert.NotNull(result);
        Assert.Equal("Updated Name", result.FullName);
        Assert.Equal("updated@example.com", result.Email);
        Assert.Equal("555-0500", result.PhoneNumber);
        Assert.Equal(FamilyStatus.Married, result.FamilyStatus);
        Assert.Equal(3, result.NumberOfKids);
    }

    [Fact]
    public async Task UpdateAsync_ShouldReturnNullForNonExistentDonor()
    {
        var updateRequest = new UpdateDonorRequest(
            FullName: "Name",
            Birthdate: null,
            Email: "email@example.com",
            PhoneNumber: "555-0000",
            Country: null,
            City: null,
            Location: null,
            FullAddress: null,
            FamilyStatus: FamilyStatus.Single,
            NumberOfKids: 0
        );

        var result = await _service.UpdateAsync(Guid.NewGuid(), updateRequest);

        Assert.Null(result);
    }

    [Fact]
    public async Task DeleteAsync_ShouldRemoveDonor()
    {
        var donor = new Donor
        {
            Id = Guid.NewGuid(),
            FullName = "To Delete",
            Email = "delete@example.com",
            PhoneNumber = "555-0600",
            Country = "USA",
            City = "Chicago",
            Location = "Loop",
            FullAddress = "100 State St",
            FamilyStatus = FamilyStatus.Divorced,
            NumberOfKids = 1,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Donors.Add(donor);
        await _context.SaveChangesAsync();

        var result = await _service.DeleteAsync(donor.Id);

        Assert.True(result);
        var deletedDonor = await _context.Donors.FindAsync(donor.Id);
        Assert.Null(deletedDonor);
    }

    [Fact]
    public async Task DeleteAsync_ShouldReturnFalseForNonExistentDonor()
    {
        var result = await _service.DeleteAsync(Guid.NewGuid());

        Assert.False(result);
    }

    [Fact]
    public async Task DeleteAsync_ShouldCascadeDeleteDonations()
    {
        var donor = new Donor
        {
            Id = Guid.NewGuid(),
            FullName = "Donor With Donations",
            Email = "cascade@example.com",
            PhoneNumber = "555-0700",
            Country = "USA",
            City = "LA",
            Location = "Hollywood",
            FullAddress = "200 Sunset Blvd",
            FamilyStatus = FamilyStatus.Widowed,
            NumberOfKids = 2,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var donation1 = new Donation
        {
            Id = Guid.NewGuid(),
            DonorId = donor.Id,
            Amount = 50m,
            DonationDate = new DateOnly(2024, 2, 1),
            PaymentMethod = PaymentMethod.Cash,
            ReceiptNumber = "RCP-2024-002",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var donation2 = new Donation
        {
            Id = Guid.NewGuid(),
            DonorId = donor.Id,
            Amount = 75m,
            DonationDate = new DateOnly(2024, 3, 1),
            PaymentMethod = PaymentMethod.CreditCard,
            ReceiptNumber = "RCP-2024-003",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Donors.Add(donor);
        _context.Donations.AddRange(donation1, donation2);
        await _context.SaveChangesAsync();

        var result = await _service.DeleteAsync(donor.Id);

        Assert.True(result);
        var remainingDonations = await _context.Donations
            .Where(d => d.DonorId == donor.Id)
            .ToListAsync();
        Assert.Empty(remainingDonations);
    }
}

using DonorManagement.Api.Data;
using DonorManagement.Api.DTOs;
using DonorManagement.Api.Exceptions;
using DonorManagement.Api.Extensions;
using Microsoft.EntityFrameworkCore;

namespace DonorManagement.Api.Services;

public class DonationService : IDonationService
{
    private readonly AppDbContext _context;

    public DonationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DonationResponse>> GetByDonorIdAsync(Guid donorId)
    {
        var donorExists = await _context.Donors.AnyAsync(d => d.Id == donorId);
        if (!donorExists)
        {
            throw new NotFoundException("Donor", donorId);
        }

        var donations = await _context.Donations
            .Where(d => d.DonorId == donorId)
            .OrderByDescending(d => d.DonationDate)
            .ToListAsync();

        return donations.Select(d => d.ToResponse()).ToList();
    }

    public async Task<DonationResponse> CreateAsync(Guid donorId, CreateDonationRequest request)
    {
        var donorExists = await _context.Donors.AnyAsync(d => d.Id == donorId);
        if (!donorExists)
        {
            throw new NotFoundException("Donor", donorId);
        }

        var receiptNumber = await GenerateReceiptNumberAsync();
        var donation = request.ToEntity(donorId, receiptNumber);

        _context.Donations.Add(donation);
        await _context.SaveChangesAsync();

        return donation.ToResponse();
    }

    public async Task<DonationResponse> UpdateAsync(Guid id, UpdateDonationRequest request)
    {
        var donation = await _context.Donations.FindAsync(id);

        if (donation == null)
        {
            throw new NotFoundException("Donation", id);
        }

        donation.Amount = request.Amount;
        donation.Currency = request.Currency;
        donation.DonationDate = request.DonationDate;
        donation.Notes = request.Notes;
        donation.PaymentMethod = request.PaymentMethod;
        donation.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return donation.ToResponse();
    }

    public async Task DeleteAsync(Guid id)
    {
        var donation = await _context.Donations.FindAsync(id);

        if (donation == null)
        {
            throw new NotFoundException("Donation", id);
        }

        _context.Donations.Remove(donation);
        await _context.SaveChangesAsync();
    }

    private async Task<string> GenerateReceiptNumberAsync()
    {
        var year = DateTime.UtcNow.Year;
        var prefix = $"RCP-{year}-";

        var lastReceipt = await _context.Donations
            .Where(d => d.ReceiptNumber.StartsWith(prefix))
            .OrderByDescending(d => d.ReceiptNumber)
            .Select(d => d.ReceiptNumber)
            .FirstOrDefaultAsync();

        int nextSequence = 1;

        if (lastReceipt != null)
        {
            var sequencePart = lastReceipt.Substring(prefix.Length);
            if (int.TryParse(sequencePart, out int lastSequence))
            {
                nextSequence = lastSequence + 1;
            }
        }

        return $"{prefix}{nextSequence:D6}";
    }
}

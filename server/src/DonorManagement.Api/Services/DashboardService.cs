using DonorManagement.Api.Data;
using DonorManagement.Api.DTOs;
using DonorManagement.Api.Extensions;
using Microsoft.EntityFrameworkCore;

namespace DonorManagement.Api.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummary> GetSummaryAsync()
    {
        var totalDonors = await _context.Donors.CountAsync();
        var amounts = await _context.Donations.Select(d => d.Amount).ToListAsync();
        var totalDonations = amounts.Count > 0 ? amounts.Sum() : 0m;

        return new DashboardSummary
        {
            TotalDonors = totalDonors,
            TotalDonations = totalDonations
        };
    }

    public async Task<List<DonationResponse>> GetRecentDonationsAsync()
    {
        var donations = await _context.Donations
            .Include(d => d.Donor)
            .OrderByDescending(d => d.DonationDate)
            .Take(10)
            .ToListAsync();

        return donations.Select(d => d.ToResponse()).ToList();
    }

    public async Task<List<TopDonor>> GetTopDonorsAsync()
    {
        var donors = await _context.Donors
            .Include(d => d.Donations)
            .Where(d => d.Donations.Any())
            .ToListAsync();

        return donors
            .Select(d => new TopDonor
            {
                DonorId = d.Id,
                FullName = d.FullName,
                TotalAmount = d.Donations.Sum(don => don.Amount),
                DonationCount = d.Donations.Count
            })
            .OrderByDescending(d => d.TotalAmount)
            .Take(10)
            .ToList();
    }

    public async Task<List<MonthlyStats>> GetMonthlyStatsAsync()
    {
        var currentYear = DateTime.UtcNow.Year;

        // Load into memory first — SQLite can't translate DateOnly.Year/.Month to SQL
        var donations = await _context.Donations.ToListAsync();

        return donations
            .Where(d => d.DonationDate.Year == currentYear)
            .GroupBy(d => new { d.DonationDate.Month, d.DonationDate.Year })
            .Select(g => new MonthlyStats
            {
                Month = g.Key.Month,
                Year = g.Key.Year,
                Total = g.Sum(d => d.Amount),
                Count = g.Count()
            })
            .OrderBy(s => s.Month)
            .ToList();
    }

    public async Task<List<UpcomingEvent>> GetUpcomingEventsAsync()
    {
        var today = DateOnly.FromDateTime(DateTime.Today);
        var in30Days = today.AddDays(30);

        var events = await _context.Events
            .Include(e => e.Donor)
            .ToListAsync();

        return events
            .Where(e => e.EventDate >= today && e.EventDate <= in30Days)
            .OrderBy(e => e.EventDate)
            .Select(e => new UpcomingEvent
            {
                EventId = e.Id,
                DonorId = e.DonorId,
                DonorName = e.Donor.FullName,
                EventType = e.EventType.ToString(),
                EventDate = e.EventDate,
                DaysUntil = e.EventDate.DayNumber - today.DayNumber,
                Notes = e.Notes
            })
            .ToList();
    }
}

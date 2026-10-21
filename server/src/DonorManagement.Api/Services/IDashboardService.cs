using DonorManagement.Api.DTOs;

namespace DonorManagement.Api.Services;

public interface IDashboardService
{
    Task<DashboardSummary> GetSummaryAsync();
    Task<List<DonationResponse>> GetRecentDonationsAsync();
    Task<List<TopDonor>> GetTopDonorsAsync();
    Task<List<MonthlyStats>> GetMonthlyStatsAsync();
    Task<List<UpcomingEvent>> GetUpcomingEventsAsync();
}

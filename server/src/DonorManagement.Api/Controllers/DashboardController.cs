using DonorManagement.Api.DTOs;
using DonorManagement.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DonorManagement.Api.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize(Policy = "StaffOrAdmin")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummary>> GetSummary()
    {
        var summary = await _dashboardService.GetSummaryAsync();
        return Ok(summary);
    }

    [HttpGet("recent-donations")]
    public async Task<ActionResult<List<DonationResponse>>> GetRecentDonations()
    {
        var donations = await _dashboardService.GetRecentDonationsAsync();
        return Ok(donations);
    }

    [HttpGet("top-donors")]
    public async Task<ActionResult<List<TopDonor>>> GetTopDonors()
    {
        var topDonors = await _dashboardService.GetTopDonorsAsync();
        return Ok(topDonors);
    }

    [HttpGet("monthly-stats")]
    public async Task<ActionResult<List<MonthlyStats>>> GetMonthlyStats()
    {
        var stats = await _dashboardService.GetMonthlyStatsAsync();
        return Ok(stats);
    }

    [HttpGet("upcoming-events")]
    public async Task<ActionResult<List<UpcomingEvent>>> GetUpcomingEvents()
    {
        var events = await _dashboardService.GetUpcomingEventsAsync();
        return Ok(events);
    }
}

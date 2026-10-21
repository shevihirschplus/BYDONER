namespace DonorManagement.Api.DTOs;

public class DashboardSummary
{
    public int TotalDonors { get; set; }
    public decimal TotalDonations { get; set; }
}

public class MonthlyStats
{
    public int Month { get; set; }
    public int Year { get; set; }
    public decimal Total { get; set; }
    public int Count { get; set; }
}

public class TopDonor
{
    public Guid DonorId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public int DonationCount { get; set; }
}

public class UpcomingEvent
{
    public Guid EventId { get; set; }
    public Guid DonorId { get; set; }
    public string DonorName { get; set; } = string.Empty;
    public string EventType { get; set; } = string.Empty;
    public DateOnly EventDate { get; set; }
    public int DaysUntil { get; set; }
    public string? Notes { get; set; }
}

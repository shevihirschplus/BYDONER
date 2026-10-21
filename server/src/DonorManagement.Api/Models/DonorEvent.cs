using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.Models;

public class DonorEvent
{
    public Guid Id { get; set; }
    public Guid DonorId { get; set; }
    public EventType EventType { get; set; }
    public DateOnly EventDate { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public Donor Donor { get; set; } = null!;
}

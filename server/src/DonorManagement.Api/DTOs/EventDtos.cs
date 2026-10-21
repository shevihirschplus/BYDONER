using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.DTOs;

public record CreateEventRequest(
    EventType EventType,
    DateOnly EventDate,
    string? Notes
);

public record UpdateEventRequest(
    EventType EventType,
    DateOnly EventDate,
    string? Notes
);

public class EventResponse
{
    public Guid Id { get; set; }
    public Guid DonorId { get; set; }
    public EventType EventType { get; set; }
    public DateOnly EventDate { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

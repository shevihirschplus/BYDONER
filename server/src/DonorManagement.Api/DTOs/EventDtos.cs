using System.Text.Json.Serialization;
using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.DTOs;

public class CreateEventRequest
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public EventType EventType { get; set; }
    public DateOnly EventDate { get; set; }
    public string? Notes { get; set; }
}

public class UpdateEventRequest
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public EventType EventType { get; set; }
    public DateOnly EventDate { get; set; }
    public string? Notes { get; set; }
}

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

using System.Text.Json.Serialization;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.DTOs;

public class CreateDonationRequest
{
    public decimal Amount { get; set; }
    public DateOnly DonationDate { get; set; }
    public string? Notes { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PaymentMethod PaymentMethod { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Currency Currency { get; set; } = Currency.USD;
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public DonationType DonationType { get; set; } = DonationType.OneTime;
}

public class UpdateDonationRequest
{
    public decimal Amount { get; set; }
    public DateOnly DonationDate { get; set; }
    public string? Notes { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PaymentMethod PaymentMethod { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Currency Currency { get; set; } = Currency.USD;
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public DonationType DonationType { get; set; } = DonationType.OneTime;
}

public class DonationResponse
{
    public Guid Id { get; set; }
    public Guid DonorId { get; set; }
    public decimal Amount { get; set; }
    public Currency Currency { get; set; }
    public DateOnly DonationDate { get; set; }
    public string? Notes { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
    public DonationType DonationType { get; set; }
    public string ReceiptNumber { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

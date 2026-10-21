using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.DTOs;

public record CreateDonationRequest(
    decimal Amount,
    DateOnly DonationDate,
    string? Notes,
    PaymentMethod PaymentMethod,
    Currency Currency = Currency.USD
);

public record UpdateDonationRequest(
    decimal Amount,
    DateOnly DonationDate,
    string? Notes,
    PaymentMethod PaymentMethod,
    Currency Currency = Currency.USD
);

public class DonationResponse
{
    public Guid Id { get; set; }
    public Guid DonorId { get; set; }
    public decimal Amount { get; set; }
    public Currency Currency { get; set; }
    public DateOnly DonationDate { get; set; }
    public string? Notes { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
    public string ReceiptNumber { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

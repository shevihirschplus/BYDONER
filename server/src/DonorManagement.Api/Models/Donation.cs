using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.Models;

public class Donation
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
    public Donor Donor { get; set; } = null!;
}

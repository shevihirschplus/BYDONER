using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.Models;

public class Donor
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public DateOnly? Birthdate { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Location { get; set; }
    public string? FullAddress { get; set; }
    public FamilyStatus FamilyStatus { get; set; }
    public int NumberOfKids { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public ICollection<Donation> Donations { get; set; } = new List<Donation>();
    public ICollection<DonorEvent> Events { get; set; } = new List<DonorEvent>();
}

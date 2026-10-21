using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.DTOs;

public record CreateDonorRequest(
    string FullName,
    DateOnly? Birthdate,
    string Email,
    string PhoneNumber,
    string? Country,
    string? City,
    string? Location,
    string? FullAddress,
    FamilyStatus FamilyStatus,
    int NumberOfKids
);

public record UpdateDonorRequest(
    string FullName,
    DateOnly? Birthdate,
    string Email,
    string PhoneNumber,
    string? Country,
    string? City,
    string? Location,
    string? FullAddress,
    FamilyStatus FamilyStatus,
    int NumberOfKids
);

public class DonorResponse
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
    public List<DonationResponse> Donations { get; set; } = new();
    public List<EventResponse> Events { get; set; } = new();
}

public record DonorSearchFilter(
    string? Query,
    FamilyStatus? FamilyStatus,
    string? Location,
    decimal? MinAmount,
    decimal? MaxAmount,
    DateOnly? FromDate,
    DateOnly? ToDate,
    int Page = 1,
    int PageSize = 10
);

public class PagedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}

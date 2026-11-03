using System.Text.Json.Serialization;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.DTOs;

public class CreateDonorRequest
{
    public string FullName { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? SpouseName { get; set; }
    public DateOnly? Birthdate { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? HomePhone { get; set; }
    public string? CellPhone { get; set; }
    public string? WorkPhone { get; set; }
    public string? GeneralNotes { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Location { get; set; }
    public string? FullAddress { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public FamilyStatus? FamilyStatus { get; set; }
    public int NumberOfKids { get; set; }
}

public class UpdateDonorRequest
{
    public string FullName { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? SpouseName { get; set; }
    public DateOnly? Birthdate { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? HomePhone { get; set; }
    public string? CellPhone { get; set; }
    public string? WorkPhone { get; set; }
    public string? GeneralNotes { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Location { get; set; }
    public string? FullAddress { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public FamilyStatus? FamilyStatus { get; set; }
    public int NumberOfKids { get; set; }
}

public class DonorResponse
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? SpouseName { get; set; }
    public DateOnly? Birthdate { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? HomePhone { get; set; }
    public string? CellPhone { get; set; }
    public string? WorkPhone { get; set; }
    public string? GeneralNotes { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Location { get; set; }
    public string? FullAddress { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public FamilyStatus? FamilyStatus { get; set; }
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

using DonorManagement.Api.DTOs;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;

namespace DonorManagement.Api.Extensions;

public static class MappingExtensions
{
    public static DonorResponse ToResponse(this Donor donor)
    {
        return new DonorResponse
        {
            Id = donor.Id,
            FullName = donor.FullName,
            Birthdate = donor.Birthdate,
            Email = donor.Email,
            PhoneNumber = donor.PhoneNumber,
            Country = donor.Country,
            City = donor.City,
            Location = donor.Location,
            FullAddress = donor.FullAddress,
            FamilyStatus = donor.FamilyStatus,
            NumberOfKids = donor.NumberOfKids,
            CreatedAt = donor.CreatedAt,
            UpdatedAt = donor.UpdatedAt,
            Donations = donor.Donations?.Select(d => d.ToResponse()).ToList() ?? new List<DonationResponse>(),
            Events = donor.Events?.Select(e => e.ToResponse()).ToList() ?? new List<EventResponse>()
        };
    }

    public static EventResponse ToResponse(this DonorEvent e)
    {
        return new EventResponse
        {
            Id = e.Id,
            DonorId = e.DonorId,
            EventType = e.EventType,
            EventDate = e.EventDate,
            Notes = e.Notes,
            CreatedAt = e.CreatedAt,
            UpdatedAt = e.UpdatedAt
        };
    }

    public static DonorEvent ToEntity(this CreateEventRequest request, Guid donorId)
    {
        return new DonorEvent
        {
            Id = Guid.NewGuid(),
            DonorId = donorId,
            EventType = request.EventType,
            EventDate = request.EventDate,
            Notes = request.Notes,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
    }

    public static DonationResponse ToResponse(this Donation donation)
    {
        return new DonationResponse
        {
            Id = donation.Id,
            DonorId = donation.DonorId,
            Amount = donation.Amount,
            Currency = donation.Currency,
            DonationDate = donation.DonationDate,
            Notes = donation.Notes,
            PaymentMethod = donation.PaymentMethod,
            ReceiptNumber = donation.ReceiptNumber,
            CreatedAt = donation.CreatedAt,
            UpdatedAt = donation.UpdatedAt
        };
    }

    public static Donor ToEntity(this CreateDonorRequest request)
    {
        return new Donor
        {
            Id = Guid.NewGuid(),
            FullName = request.FullName,
            Birthdate = request.Birthdate,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Country = request.Country,
            City = request.City,
            Location = request.Location,
            FullAddress = request.FullAddress,
            FamilyStatus = request.FamilyStatus,
            NumberOfKids = request.NumberOfKids,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
    }

    public static Donation ToEntity(this CreateDonationRequest request, Guid donorId, string receiptNumber)
    {
        return new Donation
        {
            Id = Guid.NewGuid(),
            DonorId = donorId,
            Amount = request.Amount,
            Currency = request.Currency,
            DonationDate = request.DonationDate,
            Notes = request.Notes,
            PaymentMethod = request.PaymentMethod,
            ReceiptNumber = receiptNumber,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
    }
}

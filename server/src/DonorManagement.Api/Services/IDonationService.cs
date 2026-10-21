using DonorManagement.Api.DTOs;

namespace DonorManagement.Api.Services;

public interface IDonationService
{
    Task<List<DonationResponse>> GetByDonorIdAsync(Guid donorId);
    Task<DonationResponse> CreateAsync(Guid donorId, CreateDonationRequest request);
    Task<DonationResponse> UpdateAsync(Guid id, UpdateDonationRequest request);
    Task DeleteAsync(Guid id);
}

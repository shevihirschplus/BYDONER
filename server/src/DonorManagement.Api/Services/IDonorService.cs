using DonorManagement.Api.DTOs;

namespace DonorManagement.Api.Services;

public interface IDonorService
{
    Task<PagedResult<DonorResponse>> SearchAsync(DonorSearchFilter filter);
    Task<DonorResponse?> GetByIdAsync(Guid id);
    Task<DonorResponse> CreateAsync(CreateDonorRequest request);
    Task<DonorResponse?> UpdateAsync(Guid id, UpdateDonorRequest request);
    Task<bool> DeleteAsync(Guid id);
}

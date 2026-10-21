using DonorManagement.Api.DTOs;

namespace DonorManagement.Api.Services;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);
}

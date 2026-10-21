using DonorManagement.Api.DTOs;

namespace DonorManagement.Api.Services;

public interface IEventService
{
    Task<List<EventResponse>> GetByDonorIdAsync(Guid donorId);
    Task<EventResponse> CreateAsync(Guid donorId, CreateEventRequest request);
    Task<EventResponse> UpdateAsync(Guid id, UpdateEventRequest request);
    Task DeleteAsync(Guid id);
}

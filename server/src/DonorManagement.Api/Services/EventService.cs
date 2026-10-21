using DonorManagement.Api.Data;
using DonorManagement.Api.DTOs;
using DonorManagement.Api.Exceptions;
using DonorManagement.Api.Extensions;
using Microsoft.EntityFrameworkCore;

namespace DonorManagement.Api.Services;

public class EventService : IEventService
{
    private readonly AppDbContext _context;

    public EventService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<EventResponse>> GetByDonorIdAsync(Guid donorId)
    {
        var donorExists = await _context.Donors.AnyAsync(d => d.Id == donorId);
        if (!donorExists)
            throw new NotFoundException("Donor", donorId);

        return await _context.Events
            .Where(e => e.DonorId == donorId)
            .OrderBy(e => e.EventDate)
            .Select(e => e.ToResponse())
            .ToListAsync();
    }

    public async Task<EventResponse> CreateAsync(Guid donorId, CreateEventRequest request)
    {
        var donorExists = await _context.Donors.AnyAsync(d => d.Id == donorId);
        if (!donorExists)
            throw new NotFoundException("Donor", donorId);

        var entity = request.ToEntity(donorId);
        _context.Events.Add(entity);
        await _context.SaveChangesAsync();

        return entity.ToResponse();
    }

    public async Task<EventResponse> UpdateAsync(Guid id, UpdateEventRequest request)
    {
        var entity = await _context.Events.FindAsync(id);
        if (entity == null)
            throw new NotFoundException("Event", id);

        entity.EventType = request.EventType;
        entity.EventDate = request.EventDate;
        entity.Notes = request.Notes;
        entity.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return entity.ToResponse();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.Events.FindAsync(id);
        if (entity == null)
            throw new NotFoundException("Event", id);

        _context.Events.Remove(entity);
        await _context.SaveChangesAsync();
    }
}

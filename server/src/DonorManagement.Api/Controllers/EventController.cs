using DonorManagement.Api.DTOs;
using DonorManagement.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DonorManagement.Api.Controllers;

[ApiController]
[Authorize(Policy = "StaffOrAdmin")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet("api/donors/{donorId:guid}/events")]
    public async Task<ActionResult<List<EventResponse>>> GetByDonorId(Guid donorId)
    {
        var events = await _eventService.GetByDonorIdAsync(donorId);
        return Ok(events);
    }

    [HttpPost("api/donors/{donorId:guid}/events")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<EventResponse>> Create(Guid donorId, [FromBody] CreateEventRequest request)
    {
        var ev = await _eventService.CreateAsync(donorId, request);
        return CreatedAtAction(nameof(GetByDonorId), new { donorId }, ev);
    }

    [HttpPut("api/events/{id:guid}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<EventResponse>> Update(Guid id, [FromBody] UpdateEventRequest request)
    {
        var ev = await _eventService.UpdateAsync(id, request);
        return Ok(ev);
    }

    [HttpDelete("api/events/{id:guid}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _eventService.DeleteAsync(id);
        return NoContent();
    }
}

using DonorManagement.Api.DTOs;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;
using DonorManagement.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DonorManagement.Api.Controllers;

[ApiController]
[Route("api/donors")]
public class DonorController : ControllerBase
{
    private readonly IDonorService _donorService;

    public DonorController(IDonorService donorService)
    {
        _donorService = donorService;
    }

    [HttpGet]
    [Authorize(Policy = "StaffOrAdmin")]
    public async Task<ActionResult<PagedResult<DonorResponse>>> Search(
        [FromQuery] string? query,
        [FromQuery] FamilyStatus? familyStatus,
        [FromQuery] string? location,
        [FromQuery] decimal? minAmount,
        [FromQuery] decimal? maxAmount,
        [FromQuery] DateOnly? fromDate,
        [FromQuery] DateOnly? toDate,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var filter = new DonorSearchFilter(
            query,
            familyStatus,
            location,
            minAmount,
            maxAmount,
            fromDate,
            toDate,
            page,
            pageSize
        );

        var result = await _donorService.SearchAsync(filter);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [Authorize(Policy = "StaffOrAdmin")]
    public async Task<ActionResult<DonorResponse>> GetById(Guid id)
    {
        var donor = await _donorService.GetByIdAsync(id);
        if (donor == null) return NotFound();
        return Ok(donor);
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<DonorResponse>> Create([FromBody] CreateDonorRequest request)
    {
        var donor = await _donorService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = donor.Id }, donor);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<DonorResponse>> Update(Guid id, [FromBody] UpdateDonorRequest request)
    {
        var donor = await _donorService.UpdateAsync(id, request);
        if (donor == null) return NotFound();
        return Ok(donor);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var deleted = await _donorService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}

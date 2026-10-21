using DonorManagement.Api.DTOs;
using DonorManagement.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DonorManagement.Api.Controllers;

[ApiController]
[Authorize(Policy = "StaffOrAdmin")]
public class DonationController : ControllerBase
{
    private readonly IDonationService _donationService;

    public DonationController(IDonationService donationService)
    {
        _donationService = donationService;
    }

    [HttpGet("api/donors/{donorId:guid}/donations")]
    public async Task<ActionResult<List<DonationResponse>>> GetByDonorId(Guid donorId)
    {
        var donations = await _donationService.GetByDonorIdAsync(donorId);
        return Ok(donations);
    }

    [HttpPost("api/donors/{donorId:guid}/donations")]
    public async Task<ActionResult<DonationResponse>> Create(Guid donorId, [FromBody] CreateDonationRequest request)
    {
        var donation = await _donationService.CreateAsync(donorId, request);
        return CreatedAtAction(nameof(GetByDonorId), new { donorId }, donation);
    }

    [HttpPut("api/donations/{id:guid}")]
    public async Task<ActionResult<DonationResponse>> Update(Guid id, [FromBody] UpdateDonationRequest request)
    {
        var donation = await _donationService.UpdateAsync(id, request);
        return Ok(donation);
    }

    [HttpDelete("api/donations/{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _donationService.DeleteAsync(id);
        return NoContent();
    }
}

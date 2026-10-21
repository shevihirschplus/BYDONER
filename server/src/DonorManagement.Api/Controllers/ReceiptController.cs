using DonorManagement.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DonorManagement.Api.Controllers;

[ApiController]
[Route("api/donations/{donationId:guid}/receipt")]
[Authorize(Policy = "StaffOrAdmin")]
public class ReceiptController : ControllerBase
{
    private readonly IReceiptService _receiptService;

    public ReceiptController(IReceiptService receiptService)
    {
        _receiptService = receiptService;
    }

    [HttpGet("pdf")]
    public async Task<IActionResult> GetPdf(Guid donationId)
    {
        var pdfBytes = await _receiptService.GeneratePdfAsync(donationId);
        return File(pdfBytes, "application/pdf", $"receipt-{donationId}.pdf");
    }

    [HttpGet("docx")]
    public async Task<IActionResult> GetDocx(Guid donationId)
    {
        var docxBytes = await _receiptService.GenerateDocxAsync(donationId);
        return File(docxBytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            $"receipt-{donationId}.docx");
    }
}

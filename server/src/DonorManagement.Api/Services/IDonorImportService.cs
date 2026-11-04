using DonorManagement.Api.DTOs;

namespace DonorManagement.Api.Services;

public interface IDonorImportService
{
    /// <summary>
    /// Parses an uploaded .xlsx file and creates donors from its rows.
    /// </summary>
    Task<DonorImportResult> ImportAsync(Stream excelStream);
}

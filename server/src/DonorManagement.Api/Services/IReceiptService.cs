namespace DonorManagement.Api.Services;

public interface IReceiptService
{
    Task<byte[]> GeneratePdfAsync(Guid donationId);
    Task<byte[]> GenerateDocxAsync(Guid donationId);
}

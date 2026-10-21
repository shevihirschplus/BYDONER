using DonorManagement.Api.DTOs;
using DonorManagement.Api.Models.Enums;
using DonorManagement.Api.Validators;
using FluentValidation.TestHelper;

namespace DonorManagement.UnitTests.Validators;

public class CreateDonationRequestValidatorTests
{
    private readonly CreateDonationRequestValidator _validator = new();

    private static CreateDonationRequest ValidRequest() => new(
        Amount: 100.00m,
        DonationDate: new DateOnly(2024, 6, 15),
        Notes: "Monthly donation",
        PaymentMethod: PaymentMethod.CreditCard
    );

    [Fact]
    public void ValidRequest_ShouldPass()
    {
        var result = _validator.TestValidate(ValidRequest());
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(-100.50)]
    public void Amount_WhenZeroOrNegative_ShouldFail(decimal amount)
    {
        var request = ValidRequest() with { Amount = amount };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.Amount)
            .WithErrorMessage("Donation amount must be positive");
    }

    [Theory]
    [InlineData(0.01)]
    [InlineData(1)]
    [InlineData(999999.99)]
    public void Amount_WhenPositive_ShouldPass(decimal amount)
    {
        var request = ValidRequest() with { Amount = amount };
        var result = _validator.TestValidate(request);
        result.ShouldNotHaveValidationErrorFor(x => x.Amount);
    }

    [Fact]
    public void PaymentMethod_WhenInvalidEnum_ShouldFail()
    {
        var request = ValidRequest() with { PaymentMethod = (PaymentMethod)999 };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.PaymentMethod)
            .WithErrorMessage("Invalid payment method");
    }

    [Theory]
    [InlineData(PaymentMethod.Cash)]
    [InlineData(PaymentMethod.CreditCard)]
    [InlineData(PaymentMethod.BankTransfer)]
    [InlineData(PaymentMethod.Check)]
    [InlineData(PaymentMethod.Other)]
    public void PaymentMethod_WhenValidEnum_ShouldPass(PaymentMethod method)
    {
        var request = ValidRequest() with { PaymentMethod = method };
        var result = _validator.TestValidate(request);
        result.ShouldNotHaveValidationErrorFor(x => x.PaymentMethod);
    }

    [Fact]
    public void DonationDate_WhenDefault_ShouldFail()
    {
        var request = ValidRequest() with { DonationDate = default };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.DonationDate)
            .WithErrorMessage("Donation date is required");
    }

    [Fact]
    public void DonationDate_WhenValid_ShouldPass()
    {
        var request = ValidRequest() with { DonationDate = new DateOnly(2024, 1, 1) };
        var result = _validator.TestValidate(request);
        result.ShouldNotHaveValidationErrorFor(x => x.DonationDate);
    }
}

public class UpdateDonationRequestValidatorTests
{
    private readonly UpdateDonationRequestValidator _validator = new();

    private static UpdateDonationRequest ValidRequest() => new(
        Amount: 250.00m,
        DonationDate: new DateOnly(2024, 3, 20),
        Notes: "Updated donation",
        PaymentMethod: PaymentMethod.BankTransfer
    );

    [Fact]
    public void ValidRequest_ShouldPass()
    {
        var result = _validator.TestValidate(ValidRequest());
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Amount_WhenZero_ShouldFail()
    {
        var request = ValidRequest() with { Amount = 0 };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.Amount)
            .WithErrorMessage("Donation amount must be positive");
    }

    [Fact]
    public void Amount_WhenNegative_ShouldFail()
    {
        var request = ValidRequest() with { Amount = -50m };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.Amount)
            .WithErrorMessage("Donation amount must be positive");
    }

    [Fact]
    public void PaymentMethod_WhenInvalidEnum_ShouldFail()
    {
        var request = ValidRequest() with { PaymentMethod = (PaymentMethod)42 };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.PaymentMethod)
            .WithErrorMessage("Invalid payment method");
    }

    [Fact]
    public void DonationDate_WhenDefault_ShouldFail()
    {
        var request = ValidRequest() with { DonationDate = default };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.DonationDate)
            .WithErrorMessage("Donation date is required");
    }
}

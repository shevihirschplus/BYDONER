using DonorManagement.Api.DTOs;
using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;
using FluentValidation;

namespace DonorManagement.Api.Validators;

public class CreateDonationRequestValidator : AbstractValidator<CreateDonationRequest>
{
    public CreateDonationRequestValidator()
    {
        RuleFor(x => x.Amount)
            .GreaterThan(0).WithMessage("Amount must be greater than 0.");

        RuleFor(x => x.DonationDate)
            .NotEmpty().WithMessage("Donation date is required.");

        RuleFor(x => x.PaymentMethod)
            .IsInEnum().WithMessage("Payment method must be a valid value.");
    }
}

public class UpdateDonationRequestValidator : AbstractValidator<UpdateDonationRequest>
{
    public UpdateDonationRequestValidator()
    {
        RuleFor(x => x.Amount)
            .GreaterThan(0).WithMessage("Amount must be greater than 0.");

        RuleFor(x => x.DonationDate)
            .NotEmpty().WithMessage("Donation date is required.");

        RuleFor(x => x.PaymentMethod)
            .IsInEnum().WithMessage("Payment method must be a valid value.");
    }
}

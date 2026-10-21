using DonorManagement.Api.DTOs;
using FluentValidation;

namespace DonorManagement.Api.Validators;

public class CreateDonorRequestValidator : AbstractValidator<CreateDonorRequest>
{
    public CreateDonorRequestValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("Full name is required.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .Must(email => email.Contains('@') && email.IndexOf('@') < email.Length - 1 && email.Substring(email.IndexOf('@') + 1).Contains('.'))
            .WithMessage("Email must be a valid email address with a domain.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^[\d\+\-\(\)\s]+$")
            .WithMessage("Phone number can only contain digits, plus signs, hyphens, parentheses, and spaces.");

        RuleFor(x => x.NumberOfKids)
            .GreaterThanOrEqualTo(0).WithMessage("Number of kids must be 0 or greater.");
    }
}

public class UpdateDonorRequestValidator : AbstractValidator<UpdateDonorRequest>
{
    public UpdateDonorRequestValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("Full name is required.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .Must(email => email.Contains('@') && email.IndexOf('@') < email.Length - 1 && email.Substring(email.IndexOf('@') + 1).Contains('.'))
            .WithMessage("Email must be a valid email address with a domain.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^[\d\+\-\(\)\s]+$")
            .WithMessage("Phone number can only contain digits, plus signs, hyphens, parentheses, and spaces.");

        RuleFor(x => x.NumberOfKids)
            .GreaterThanOrEqualTo(0).WithMessage("Number of kids must be 0 or greater.");
    }
}

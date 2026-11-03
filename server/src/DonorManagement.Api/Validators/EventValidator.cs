using DonorManagement.Api.DTOs;
using FluentValidation;

namespace DonorManagement.Api.Validators;

public class CreateEventRequestValidator : AbstractValidator<CreateEventRequest>
{
    public CreateEventRequestValidator()
    {
        RuleFor(x => x.EventType)
            .IsInEnum().WithMessage("Event type must be a valid value.");

        RuleFor(x => x.EventDate)
            .NotEmpty().WithMessage("Event date is required.")
            .Must(d => d != default).WithMessage("Event date must be a valid date.");
    }
}

public class UpdateEventRequestValidator : AbstractValidator<UpdateEventRequest>
{
    public UpdateEventRequestValidator()
    {
        RuleFor(x => x.EventType)
            .IsInEnum().WithMessage("Event type must be a valid value.");

        RuleFor(x => x.EventDate)
            .NotEmpty().WithMessage("Event date is required.")
            .Must(d => d != default).WithMessage("Event date must be a valid date.");
    }
}

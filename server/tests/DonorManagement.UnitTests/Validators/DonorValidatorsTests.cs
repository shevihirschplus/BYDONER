using DonorManagement.Api.DTOs;
using DonorManagement.Api.Models.Enums;
using DonorManagement.Api.Validators;
using FluentValidation.TestHelper;

namespace DonorManagement.UnitTests.Validators;

public class CreateDonorRequestValidatorTests
{
    private readonly CreateDonorRequestValidator _validator = new();

    private static CreateDonorRequest ValidRequest() => new(
        FullName: "John Doe",
        Birthdate: new DateOnly(1990, 1, 1),
        Email: "john@example.com",
        PhoneNumber: "+1 (555) 123-4567",
        Country: "US",
        City: "New York",
        Location: "Manhattan",
        FullAddress: "123 Main St",
        FamilyStatus: FamilyStatus.Single,
        NumberOfKids: 0
    );

    [Fact]
    public void ValidRequest_ShouldPass()
    {
        var result = _validator.TestValidate(ValidRequest());
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void FullName_WhenEmpty_ShouldFail(string? fullName)
    {
        var request = ValidRequest() with { FullName = fullName! };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.FullName);
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void Email_WhenEmpty_ShouldFail(string? email)
    {
        var request = ValidRequest() with { Email = email! };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [InlineData("notanemail")]
    [InlineData("missing@")]
    [InlineData("@nodomain")]
    public void Email_WhenInvalidFormat_ShouldFail(string email)
    {
        var request = ValidRequest() with { Email = email };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [InlineData("user@domain.com")]
    [InlineData("test.name@company.org")]
    [InlineData("a@b.co")]
    public void Email_WhenValidFormat_ShouldPass(string email)
    {
        var request = ValidRequest() with { Email = email };
        var result = _validator.TestValidate(request);
        result.ShouldNotHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void PhoneNumber_WhenEmpty_ShouldFail(string? phone)
    {
        var request = ValidRequest() with { PhoneNumber = phone! };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.PhoneNumber);
    }

    [Theory]
    [InlineData("abc123")]
    [InlineData("555.123.4567")]
    [InlineData("phone@number")]
    [InlineData("123#456")]
    public void PhoneNumber_WhenInvalidCharacters_ShouldFail(string phone)
    {
        var request = ValidRequest() with { PhoneNumber = phone };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.PhoneNumber);
    }

    [Theory]
    [InlineData("+1 (555) 123-4567")]
    [InlineData("5551234567")]
    [InlineData("+972-50-123-4567")]
    [InlineData("(02) 1234 5678")]
    public void PhoneNumber_WhenValidFormat_ShouldPass(string phone)
    {
        var request = ValidRequest() with { PhoneNumber = phone };
        var result = _validator.TestValidate(request);
        result.ShouldNotHaveValidationErrorFor(x => x.PhoneNumber);
    }

    [Fact]
    public void NumberOfKids_WhenNegative_ShouldFail()
    {
        var request = ValidRequest() with { NumberOfKids = -1 };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.NumberOfKids);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(3)]
    public void NumberOfKids_WhenZeroOrPositive_ShouldPass(int kids)
    {
        var request = ValidRequest() with { NumberOfKids = kids };
        var result = _validator.TestValidate(request);
        result.ShouldNotHaveValidationErrorFor(x => x.NumberOfKids);
    }
}

public class UpdateDonorRequestValidatorTests
{
    private readonly UpdateDonorRequestValidator _validator = new();

    private static UpdateDonorRequest ValidRequest() => new(
        FullName: "Jane Smith",
        Birthdate: new DateOnly(1985, 6, 15),
        Email: "jane@example.com",
        PhoneNumber: "+44 20 7946 0958",
        Country: "UK",
        City: "London",
        Location: "Westminster",
        FullAddress: "10 Downing St",
        FamilyStatus: FamilyStatus.Married,
        NumberOfKids: 2
    );

    [Fact]
    public void ValidRequest_ShouldPass()
    {
        var result = _validator.TestValidate(ValidRequest());
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void FullName_WhenEmpty_ShouldFail()
    {
        var request = ValidRequest() with { FullName = "" };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.FullName);
    }

    [Fact]
    public void Email_WhenInvalidFormat_ShouldFail()
    {
        var request = ValidRequest() with { Email = "not-an-email" };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Fact]
    public void PhoneNumber_WhenInvalidCharacters_ShouldFail()
    {
        var request = ValidRequest() with { PhoneNumber = "abc!@#" };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.PhoneNumber);
    }

    [Fact]
    public void NumberOfKids_WhenNegative_ShouldFail()
    {
        var request = ValidRequest() with { NumberOfKids = -5 };
        var result = _validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.NumberOfKids);
    }
}

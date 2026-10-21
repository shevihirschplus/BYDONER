using System.Text.Json;
using DonorManagement.Api.Exceptions;
using DonorManagement.Api.Middleware;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace DonorManagement.UnitTests.Middleware;

public class ExceptionMiddlewareTests
{
    private readonly ExceptionMiddleware _middleware;
    private readonly TestLogger _logger;

    public ExceptionMiddlewareTests()
    {
        _logger = new TestLogger();
        _middleware = new ExceptionMiddleware(
            next: _ => throw new InvalidOperationException("Should not reach here"),
            logger: _logger);
    }

    [Fact]
    public async Task InvokeAsync_WhenNoException_ReturnsSuccessfully()
    {
        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();

        var middleware = new ExceptionMiddleware(
            next: _ => Task.CompletedTask,
            logger: _logger);

        await middleware.InvokeAsync(context);

        Assert.NotEqual(500, context.Response.StatusCode);
    }

    [Fact]
    public async Task InvokeAsync_WhenNotFoundException_Returns404WithErrorMessage()
    {
        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();

        var middleware = new ExceptionMiddleware(
            next: _ => throw new NotFoundException("Donor not found"),
            logger: _logger);

        await middleware.InvokeAsync(context);

        Assert.Equal(404, context.Response.StatusCode);

        var body = await ReadResponseBody(context);
        var response = JsonSerializer.Deserialize<JsonElement>(body);
        Assert.Equal("Donor not found", response.GetProperty("error").GetString());
    }

    [Fact]
    public async Task InvokeAsync_WhenValidationException_Returns400WithFieldErrors()
    {
        var failures = new List<ValidationFailure>
        {
            new("Email", "Email is required"),
            new("Email", "Email format is invalid"),
            new("FullName", "Full name is required")
        };

        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();

        var middleware = new ExceptionMiddleware(
            next: _ => throw new ValidationException(failures),
            logger: _logger);

        await middleware.InvokeAsync(context);

        Assert.Equal(400, context.Response.StatusCode);

        var body = await ReadResponseBody(context);
        var response = JsonSerializer.Deserialize<JsonElement>(body);
        var errors = response.GetProperty("errors");

        Assert.Equal(2, errors.GetProperty("Email").GetArrayLength());
        Assert.Equal(1, errors.GetProperty("FullName").GetArrayLength());
    }

    [Fact]
    public async Task InvokeAsync_WhenUnhandledException_Returns500WithGenericMessage()
    {
        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();

        var middleware = new ExceptionMiddleware(
            next: _ => throw new InvalidOperationException("Something broke"),
            logger: _logger);

        await middleware.InvokeAsync(context);

        Assert.Equal(500, context.Response.StatusCode);

        var body = await ReadResponseBody(context);
        var response = JsonSerializer.Deserialize<JsonElement>(body);
        Assert.Equal("An unexpected error occurred", response.GetProperty("error").GetString());
    }

    [Fact]
    public async Task InvokeAsync_WhenException_LogsWithCorrelationId()
    {
        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();

        var middleware = new ExceptionMiddleware(
            next: _ => throw new InvalidOperationException("Test error"),
            logger: _logger);

        await middleware.InvokeAsync(context);

        Assert.Contains("CorrelationId", _logger.LastMessage);
    }

    private static async Task<string> ReadResponseBody(HttpContext context)
    {
        context.Response.Body.Seek(0, SeekOrigin.Begin);
        using var reader = new StreamReader(context.Response.Body);
        return await reader.ReadToEndAsync();
    }

    private class TestLogger : ILogger<ExceptionMiddleware>
    {
        public string LastMessage { get; private set; } = string.Empty;

        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => true;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state,
            Exception? exception, Func<TState, Exception?, string> formatter)
        {
            LastMessage = formatter(state, exception);
        }
    }
}

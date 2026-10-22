using System.Text;
using DonorManagement.Api.Configuration;
using DonorManagement.Api.Middleware;
using DonorManagement.Api.Models;
using DonorManagement.Api.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuestPDF.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Configure strongly-typed settings
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection(JwtSettings.SectionName));
builder.Services.Configure<InstitutionSettings>(
    builder.Configuration.GetSection(InstitutionSettings.SectionName));

// Configure Entity Framework Core — uses Postgres in production, SQLite locally
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;

// Render provides a postgresql:// or postgres:// URL — Npgsql can parse it directly
// by setting the ConnectionString property on the builder
if (connectionString.StartsWith("postgresql://") || connectionString.StartsWith("postgres://"))
{
    var uri = new Uri(connectionString);
    var userInfo = uri.UserInfo.Split(':', 2);
    var host = uri.Host;
    var port = uri.Port > 0 ? uri.Port : 5432;
    var database = uri.AbsolutePath.TrimStart('/');
    var username = Uri.UnescapeDataString(userInfo[0]);
    var password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : "";
    connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true";
}

builder.Services.AddDbContext<DonorManagement.Api.Data.AppDbContext>(options =>
{
    if (connectionString.StartsWith("Host="))
        options.UseNpgsql(connectionString);
    else
        options.UseSqlite(connectionString);
});

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection(JwtSettings.SectionName).Get<JwtSettings>()!;
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings.SecretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

// Configure Authorization policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("StaffOrAdmin", policy => policy.RequireRole("Admin", "Staff"));
});

// Configure FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

// Register application services
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDonorService, DonorService>();
builder.Services.AddScoped<IDonationService, DonationService>();
builder.Services.AddScoped<IReceiptService, ReceiptService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();

// Add controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        // In production, set ALLOWED_ORIGINS env var to your Railway domain.
        // e.g. "https://yourapp.up.railway.app"
        var allowedOrigins = builder.Configuration["AllowedOrigins"]
            ?? "http://localhost:4200,https://localhost:4200";

        var origins = allowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries);
        policy.WithOrigins(origins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure QuestPDF license
QuestPDF.Settings.License = LicenseType.Community;

var app = builder.Build();

// Auto-migrate and seed database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DonorManagement.Api.Data.AppDbContext>();
    db.Database.EnsureCreated();

    // Seed admin user if no users exist
    if (!db.Users.Any())
    {
        var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher<User>>();
        var admin = new User
        {
            Id = Guid.NewGuid(),
            Username = "admin",
            Role = "Admin",
            CreatedAt = DateTime.UtcNow
        };
        admin.PasswordHash = hasher.HashPassword(admin, "Admin123!");

        var staff = new User
        {
            Id = Guid.NewGuid(),
            Username = "staff",
            Role = "Staff",
            CreatedAt = DateTime.UtcNow
        };
        staff.PasswordHash = hasher.HashPassword(staff, "Staff123!");

        db.Users.AddRange(admin, staff);
        db.SaveChanges();
    }
}

// Configure the HTTP request pipeline
// app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

// Serve Angular static files from wwwroot/browser (only if built)
var wwwrootBrowser = Path.Combine(app.Environment.ContentRootPath, "wwwroot", "browser");
if (Directory.Exists(wwwrootBrowser))
{
    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(wwwrootBrowser)
    });
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(wwwrootBrowser)
    });
}

app.MapControllers();

// SPA fallback: any non-API route serves index.html (for Angular routing)
if (Directory.Exists(wwwrootBrowser))
{
    app.MapFallback(async context =>
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(Path.Combine(wwwrootBrowser, "index.html"));
    });
}

app.Run();

// Make Program class accessible for integration tests
public partial class Program { }

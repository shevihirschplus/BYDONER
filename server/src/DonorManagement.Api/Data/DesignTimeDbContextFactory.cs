using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DonorManagement.Api.Data;

/// <summary>
/// Used only by the EF Core tools (dotnet ef) at design time.
/// Forces the Npgsql (PostgreSQL) provider so generated migrations target the
/// production database on Render, regardless of the local runtime provider (SQLite).
/// This type is never used by the running application.
/// </summary>
public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        // A placeholder Postgres connection string is enough for scaffolding migrations;
        // no connection is opened when generating migration files.
        var connectionString = Environment.GetEnvironmentVariable("MIGRATIONS_CONNECTION")
            ?? "Host=localhost;Port=5432;Database=donor_migrations;Username=postgres;Password=postgres";

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new AppDbContext(optionsBuilder.Options);
    }
}

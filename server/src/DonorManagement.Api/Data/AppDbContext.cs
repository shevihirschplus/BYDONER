using DonorManagement.Api.Models;
using DonorManagement.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DonorManagement.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Donor> Donors => Set<Donor>();
    public DbSet<Donation> Donations => Set<Donation>();
    public DbSet<DonorEvent> Events => Set<DonorEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Detect if we're using SQLite (needs string converters for DateOnly)
        bool isSqlite = Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite";

        // Configure User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Username).IsUnique();
        });

        // Configure Donor
        modelBuilder.Entity<Donor>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FamilyStatus)
                .HasConversion(new EnumToStringConverter<FamilyStatus>());

            if (isSqlite)
            {
                entity.Property(e => e.Birthdate)
                    .HasConversion(
                        v => v.HasValue ? v.Value.ToString("yyyy-MM-dd") : null,
                        v => v != null ? DateOnly.ParseExact(v, "yyyy-MM-dd") : (DateOnly?)null);
            }

            entity.HasMany(e => e.Donations)
                .WithOne(d => d.Donor)
                .HasForeignKey(d => d.DonorId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasMany(e => e.Events)
                .WithOne(e => e.Donor)
                .HasForeignKey(e => e.DonorId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure DonorEvent
        modelBuilder.Entity<DonorEvent>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.EventType)
                .HasConversion(new EnumToStringConverter<EventType>());

            if (isSqlite)
            {
                entity.Property(e => e.EventDate)
                    .HasConversion(
                        v => v.ToString("yyyy-MM-dd"),
                        v => DateOnly.ParseExact(v, "yyyy-MM-dd"));
            }
        });

        // Configure Donation
        modelBuilder.Entity<Donation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.PaymentMethod)
                .HasConversion(new EnumToStringConverter<PaymentMethod>());
            entity.Property(e => e.Currency)
                .HasConversion(new EnumToStringConverter<Currency>());
            entity.Property(e => e.Amount)
                .HasColumnType("decimal(18,2)");

            if (isSqlite)
            {
                entity.Property(e => e.DonationDate)
                    .HasConversion(
                        v => v.ToString("yyyy-MM-dd"),
                        v => DateOnly.ParseExact(v, "yyyy-MM-dd"));
            }
        });
    }
}

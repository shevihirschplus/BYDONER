using Microsoft.EntityFrameworkCore;

namespace DonorManagement.Api.Data;

/// <summary>
/// Reconciles a PostgreSQL database that was originally created with EnsureCreated()
/// with EF Core migrations, and keeps the live schema in sync with the model.
///
/// Two independent concerns, both idempotent and safe to run on every startup:
///
/// 1. Schema sync: adds any columns the current model expects but an older
///    EnsureCreated()-era schema is missing (e.g. Donation.DonationType). Uses
///    ADD COLUMN IF NOT EXISTS so it is a no-op once the columns exist. This runs
///    whenever the base tables already exist, regardless of migration history,
///    so it also repairs databases that were baselined before this fix existed.
///
/// 2. History baseline: if the base tables exist but the InitialCreate migration
///    is not recorded in __EFMigrationsHistory, record it so Migrate() does not
///    try to recreate existing tables ('relation "Donors" already exists', 42P07).
///
/// On a fresh database (no tables) this does nothing and lets Migrate() build
/// everything from the migrations.
/// </summary>
public static class DatabaseBaseline
{
    // Must match the generated initial migration id in Data/Migrations.
    private const string InitialMigrationId = "20261103132051_InitialCreate";
    private const string ProductVersion = "8.0.11";

    public static void EnsurePostgresBaseline(AppDbContext db)
    {
        if (!db.Database.IsNpgsql())
            return;

        // If the base tables don't exist yet, this is a fresh database; let
        // Migrate() create everything from the migrations.
        if (!TableExists(db, "Donors"))
            return;

        // 1. Schema sync — always safe, repairs drift from the EnsureCreated() era.
        db.Database.ExecuteSqlRaw(SchemaSyncSql);

        // 2. History baseline — only when InitialCreate is not yet recorded.
        if (!InitialMigrationRecorded(db))
            db.Database.ExecuteSqlRaw(BaselineHistorySql);
    }

    private static bool TableExists(AppDbContext db, string tableName)
        => Convert.ToBoolean(ExecuteScalar(db,
            $"""
            SELECT EXISTS (
                SELECT 1 FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name = '{tableName}'
            );
            """));

    private static bool InitialMigrationRecorded(AppDbContext db)
    {
        if (!TableExists(db, "__EFMigrationsHistory"))
            return false;

        return Convert.ToBoolean(ExecuteScalar(db,
            $"""
            SELECT EXISTS (
                SELECT 1 FROM "__EFMigrationsHistory"
                WHERE "MigrationId" = '{InitialMigrationId}'
            );
            """));
    }

    private static object? ExecuteScalar(AppDbContext db, string sql)
    {
        var conn = db.Database.GetDbConnection();
        var opened = conn.State != System.Data.ConnectionState.Open;
        if (opened) conn.Open();
        try
        {
            using var cmd = conn.CreateCommand();
            cmd.CommandText = sql;
            return cmd.ExecuteScalar();
        }
        finally
        {
            if (opened) conn.Close();
        }
    }

    // Adds any columns the current model expects that an older schema may lack.
    // All statements use IF NOT EXISTS, so this is a no-op on an up-to-date DB.
    // Enum columns are stored as text (EnumToStringConverter); defaults use valid
    // enum member names so existing rows satisfy the NOT NULL constraints.
    private const string SchemaSyncSql = """
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "Title"         text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "ZipCode"       text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "FirstName"     text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "LastName"      text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "SpouseName"    text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "Birthdate"     date;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "HomePhone"     text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "CellPhone"     text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "WorkPhone"     text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "GeneralNotes"  text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "Country"       text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "City"          text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "Location"      text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "FullAddress"   text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "FamilyStatus"  text;
        ALTER TABLE "Donors" ADD COLUMN IF NOT EXISTS "NumberOfKids"  integer NOT NULL DEFAULT 0;

        ALTER TABLE "Donations" ADD COLUMN IF NOT EXISTS "Currency"      text NOT NULL DEFAULT 'USD';
        ALTER TABLE "Donations" ADD COLUMN IF NOT EXISTS "Notes"         text;
        ALTER TABLE "Donations" ADD COLUMN IF NOT EXISTS "PaymentMethod" text NOT NULL DEFAULT 'Cash';
        ALTER TABLE "Donations" ADD COLUMN IF NOT EXISTS "DonationType"  text NOT NULL DEFAULT 'OneTime';
        ALTER TABLE "Donations" ADD COLUMN IF NOT EXISTS "ReceiptNumber" text NOT NULL DEFAULT '';
        ALTER TABLE "Donations" ADD COLUMN IF NOT EXISTS "CreatedAt"     timestamp with time zone NOT NULL DEFAULT now();
        ALTER TABLE "Donations" ADD COLUMN IF NOT EXISTS "UpdatedAt"     timestamp with time zone NOT NULL DEFAULT now();

        ALTER TABLE "Events" ADD COLUMN IF NOT EXISTS "EventType" text NOT NULL DEFAULT 'Birthday';
        ALTER TABLE "Events" ADD COLUMN IF NOT EXISTS "Notes"     text;
        ALTER TABLE "Events" ADD COLUMN IF NOT EXISTS "CreatedAt" timestamp with time zone NOT NULL DEFAULT now();
        ALTER TABLE "Events" ADD COLUMN IF NOT EXISTS "UpdatedAt" timestamp with time zone NOT NULL DEFAULT now();
        """;

    // Creates the history table (if needed) and records InitialCreate as applied,
    // so Migrate() skips recreating already-existing tables.
    private const string BaselineHistorySql = """
        CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
            "MigrationId" character varying(150) NOT NULL,
            "ProductVersion" character varying(32) NOT NULL,
            CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
        );

        INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
        VALUES ('20261103132051_InitialCreate', '8.0.11')
        ON CONFLICT ("MigrationId") DO NOTHING;
        """;
}

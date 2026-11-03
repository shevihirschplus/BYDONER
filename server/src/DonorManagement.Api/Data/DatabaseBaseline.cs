using Microsoft.EntityFrameworkCore;

namespace DonorManagement.Api.Data;

/// <summary>
/// Handles the one-time transition of a PostgreSQL database that was originally
/// created with EnsureCreated() (so it has tables but no __EFMigrationsHistory)
/// over to EF Core migrations.
///
/// Without this, the first call to Migrate() tries to run InitialCreate against a
/// database that already has the tables, failing with
/// 'relation "Donors" already exists' (SqlState 42P07).
///
/// This runs safely in all cases:
///  - Fresh DB (no tables): does nothing, lets Migrate() create everything.
///  - Legacy EnsureCreated DB: adds any columns the model expects but the live
///    schema is missing, then records InitialCreate as already applied so Migrate()
///    skips it and only applies future migrations.
///  - Already-baselined DB: does nothing.
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

        // Does the legacy "Donors" table already exist?
        bool donorsTableExists = Convert.ToBoolean(ExecuteScalar(db,
            """
            SELECT EXISTS (
                SELECT 1 FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name = 'Donors'
            );
            """));

        // Does the migrations history table already exist?
        bool historyTableExists = Convert.ToBoolean(ExecuteScalar(db,
            """
            SELECT EXISTS (
                SELECT 1 FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name = '__EFMigrationsHistory'
            );
            """));

        // Fresh database or already on migrations -> nothing to baseline.
        // If the history table exists we assume migrations are in control already.
        if (!donorsTableExists || historyTableExists)
            return;

        // Legacy EnsureCreated database. Bring the schema up to the current model,
        // then mark the initial migration as applied.
        db.Database.ExecuteSqlRaw(BaselineSql);
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

    // Adds any missing Donor columns (safe via IF NOT EXISTS), creates the history
    // table, and records InitialCreate as applied. Idempotent.
    private const string BaselineSql = """
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

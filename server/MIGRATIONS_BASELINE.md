# One-time Render DB baseline (switch from EnsureCreated to EF migrations)

Your Render Postgres database was created by `EnsureCreated()`, so its tables exist
but it has no `__EFMigrationsHistory` table. Before the new migration-based code
deploys, you must baseline the existing database so EF knows the initial migration
is "already applied" and does not try to recreate existing tables.

Do this ONCE, against the existing Render database, BEFORE/at the time of deploying
the new code.

## Step 1 — Add the columns that are missing on the live DB

The live schema predates these Donor columns. Run this first (safe to re-run):

```sql
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
```

(If you later discover Donations/Events/Users also drifted, compare them to
`Data/Migrations/initial.sql` and add any missing columns the same way.)

## Step 2 — Tell EF the initial migration is already applied

This creates the history table and records the initial migration WITHOUT recreating
any tables, so the next deploy's `Migrate()` sees nothing pending for InitialCreate:

```sql
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20261103132051_InitialCreate', '8.0.11')
ON CONFLICT ("MigrationId") DO NOTHING;
```

## Step 3 — Deploy the new code

On startup, `db.Database.Migrate()` runs. It sees InitialCreate is already applied
and does nothing destructive. From now on, every new migration you add and push will
be applied automatically on deploy.

## How to run SQL on Render

- Render Dashboard -> your Postgres instance -> "Connect" -> copy the external
  `psql` command, then paste the SQL above.
- Or use any Postgres client with the external connection string.

---

# Going forward (the normal workflow)

Whenever you change a model (add/remove/alter a column or entity):

```bash
cd server/src/DonorManagement.Api
dotnet ef migrations add DescriptiveName --output-dir Data/Migrations
```

Commit and push. On deploy, Render applies the new migration automatically.
No more manual SQL, and no more "column does not exist" errors.

Note: migrations are generated for PostgreSQL via DesignTimeDbContextFactory.
Local dev uses SQLite and still uses EnsureCreated(), so you don't need SQLite
migrations locally.

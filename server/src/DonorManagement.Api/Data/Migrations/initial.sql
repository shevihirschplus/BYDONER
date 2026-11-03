CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;


DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261103132051_InitialCreate') THEN
    CREATE TABLE "Donors" (
        "Id" uuid NOT NULL,
        "FullName" text NOT NULL,
        "FirstName" text,
        "LastName" text,
        "SpouseName" text,
        "Birthdate" date,
        "Email" text NOT NULL,
        "PhoneNumber" text NOT NULL,
        "HomePhone" text,
        "CellPhone" text,
        "WorkPhone" text,
        "GeneralNotes" text,
        "Country" text,
        "City" text,
        "Location" text,
        "FullAddress" text,
        "FamilyStatus" text,
        "NumberOfKids" integer NOT NULL,
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Donors" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261103132051_InitialCreate') THEN
    CREATE TABLE "Users" (
        "Id" uuid NOT NULL,
        "Username" text NOT NULL,
        "PasswordHash" text NOT NULL,
        "Role" text NOT NULL,
        "CreatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261103132051_InitialCreate') THEN
    CREATE TABLE "Donations" (
        "Id" uuid NOT NULL,
        "DonorId" uuid NOT NULL,
        "Amount" numeric(18,2) NOT NULL,
        "Currency" text NOT NULL,
        "DonationDate" date NOT NULL,
        "Notes" text,
        "PaymentMethod" text NOT NULL,
        "DonationType" text NOT NULL DEFAULT 'OneTime',
        "ReceiptNumber" text NOT NULL,
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Donations" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Donations_Donors_DonorId" FOREIGN KEY ("DonorId") REFERENCES "Donors" ("Id") ON DELETE CASCADE
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261103132051_InitialCreate') THEN
    CREATE TABLE "Events" (
        "Id" uuid NOT NULL,
        "DonorId" uuid NOT NULL,
        "EventType" text NOT NULL,
        "EventDate" date NOT NULL,
        "Notes" text,
        "CreatedAt" timestamp with time zone NOT NULL,
        "UpdatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT "PK_Events" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Events_Donors_DonorId" FOREIGN KEY ("DonorId") REFERENCES "Donors" ("Id") ON DELETE CASCADE
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261103132051_InitialCreate') THEN
    CREATE INDEX "IX_Donations_DonorId" ON "Donations" ("DonorId");
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261103132051_InitialCreate') THEN
    CREATE INDEX "IX_Events_DonorId" ON "Events" ("DonorId");
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261103132051_InitialCreate') THEN
    CREATE UNIQUE INDEX "IX_Users_Username" ON "Users" ("Username");
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20261103132051_InitialCreate') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20261103132051_InitialCreate', '8.0.11');
    END IF;
END $EF$;
COMMIT;


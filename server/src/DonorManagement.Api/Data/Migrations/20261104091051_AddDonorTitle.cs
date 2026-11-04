using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DonorManagement.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDonorTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Use IF NOT EXISTS so the migration is safe on databases that were
            // originally created with EnsureCreated() and may already have some of
            // these columns (e.g. ZipCode was in the model but never in a migration).
            // SQLite does not support ADD COLUMN IF NOT EXISTS, but local SQLite uses
            // EnsureCreated() and never runs migrations, so this SQL only targets
            // the PostgreSQL deployment.
            if (migrationBuilder.ActiveProvider?.Contains("Npgsql") == true)
            {
                migrationBuilder.Sql(
                    "ALTER TABLE \"Donors\" ADD COLUMN IF NOT EXISTS \"Title\" text;");
                migrationBuilder.Sql(
                    "ALTER TABLE \"Donors\" ADD COLUMN IF NOT EXISTS \"ZipCode\" text;");
            }
            else
            {
                migrationBuilder.AddColumn<string>(
                    name: "Title", table: "Donors", type: "text", nullable: true);
                migrationBuilder.AddColumn<string>(
                    name: "ZipCode", table: "Donors", type: "text", nullable: true);
            }
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Donors");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Donors");
        }
    }
}

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
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Donors",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "Donors",
                type: "text",
                nullable: true);
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

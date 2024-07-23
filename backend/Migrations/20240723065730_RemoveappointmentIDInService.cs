using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarotAppointment.Migrations
{
    /// <inheritdoc />
    public partial class RemoveappointmentIDInService : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            // Drop foreign key constraint
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Appointments_appointment_id",
                table: "services");

            // Drop index
            migrationBuilder.DropIndex(
                name: "IX_Services_appointment_id",
                table: "services");

            // Drop column
            migrationBuilder.DropColumn(
                name: "appointment_id",
                table: "services");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Recreate column
            migrationBuilder.AddColumn<int>(
                name: "appointment_id",
                table: "services",
                type: "int",
                nullable: true);

            // Recreate index
            migrationBuilder.CreateIndex(
                name: "IX_Services_appointment_id",
                table: "services",
                column: "appointment_id");

            // Recreate foreign key constraint
            migrationBuilder.AddForeignKey(
                name: "FK_Services_Appointments_appointment_id",
                table: "services",
                column: "appointment_id",
                principalTable: "appointments",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

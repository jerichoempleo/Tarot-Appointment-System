using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarotAppointment.Migrations
{
    /// <inheritdoc />
    public partial class ServiceScheduleInAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "schedule_id",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_schedule_id",
                table: "Appointments",
                column: "schedule_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Schedules_schedule_id",
                table: "Appointments",
                column: "schedule_id",
                principalTable: "Schedules",
                principalColumn: "schedule_id");

         
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Schedules_schedule_id",
                table: "Appointments");


            migrationBuilder.DropIndex(
                name: "IX_Appointments_schedule_id",
                table: "Appointments");

  

            migrationBuilder.DropColumn(
                name: "schedule_id",
                table: "Appointments");
        }
    }
}

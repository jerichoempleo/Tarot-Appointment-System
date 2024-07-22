using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarotAppointment.Migrations
{
    /// <inheritdoc />
    public partial class ClientAndAdminFk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop foreign keys
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Clients_client_id",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Clients_client_id",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Admins_admin_id",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Clients_client_id",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Admins_admin_id",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Admins_admin_id",
                table: "Schedules");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_Admins_admin_id",
                table: "Services");

            // Drop indexes
            migrationBuilder.DropIndex(
                name: "IX_Appointments_client_id",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Message_client_id",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_admin_id",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_client_id",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_admin_id",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_admin_id",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Services_admin_id",
                table: "Services");

            // Remove columns
            migrationBuilder.DropColumn(
                name: "client_id",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "client_id",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "admin_id",
                table: "Message");

            migrationBuilder.DropColumn(
               name: "client_id",
               table: "Notifications");

            migrationBuilder.DropColumn(
                name: "admin_id",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "admin_id",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "admin_id",
                table: "Services");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Add columns back
            migrationBuilder.AddColumn<int>(
                name: "client_id",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "client_id",
                table: "Message",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "admin_id",
                table: "Message",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "client_id",
                table: "Notifications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "admin_id",
                table: "Notifications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "admin_id",
                table: "Schedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "admin_id",
                table: "Services",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // Recreate indexes
            migrationBuilder.CreateIndex(
                name: "IX_Appointments_client_id",
                table: "Appointments",
                column: "client_id");

            migrationBuilder.CreateIndex(
                name: "IX_Message_client_id",
                table: "Message",
                column: "client_id");

            migrationBuilder.CreateIndex(
                name: "IX_Message_admin_id",
                table: "Message",
                column: "admin_id");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_client_id",
                table: "Notifications",
                column: "client_id");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_admin_id",
                table: "Notifications",
                column: "admin_id");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_admin_id",
                table: "Schedules",
                column: "admin_id");

            migrationBuilder.CreateIndex(
                name: "IX_Services_admin_id",
                table: "Services",
                column: "admin_id");

            // Recreate foreign keys
            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Clients_client_id",
                table: "Appointments",
                column: "client_id",
                principalTable: "Clients",
                principalColumn: "client_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Clients_client_id",
                table: "Message",
                column: "client_id",
                principalTable: "Clients",
                principalColumn: "client_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Admins_admin_id",
                table: "Message",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Clients_client_id",
                table: "Notifications",
                column: "client_id",
                principalTable: "Clients",
                principalColumn: "client_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Admins_admin_id",
                table: "Notifications",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Admins_admin_id",
                table: "Schedules",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Admins_admin_id",
                table: "Services",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id",
                onDelete: ReferentialAction.Cascade);

        }
    }
}


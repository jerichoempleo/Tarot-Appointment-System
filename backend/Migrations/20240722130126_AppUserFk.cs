using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarotAppointment.Migrations
{
    /// <inheritdoc />
    public partial class AppUserFk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_Admins_admin_id",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Clients_client_id",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Admins_admin_id",
                table: "Schedules");

            migrationBuilder.AlterColumn<int>(
                name: "admin_id",
                table: "Schedules",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                table: "Schedules",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "client_id",
                table: "Notifications",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "admin_id",
                table: "Notifications",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                table: "Notifications",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "client_id",
                table: "Message",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "admin_id",
                table: "Message",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                table: "Message",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "client_id",
                table: "Appointments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                table: "Appointments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_user_id",
                table: "Schedules",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_user_id",
                table: "Notifications",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Message_user_id",
                table: "Message",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_user_id",
                table: "Appointments",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_AspNetUsers_user_id",
                table: "Appointments",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Admins_admin_id",
                table: "Message",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_AspNetUsers_user_id",
                table: "Message",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Clients_client_id",
                table: "Message",
                column: "client_id",
                principalTable: "Clients",
                principalColumn: "client_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_AspNetUsers_user_id",
                table: "Notifications",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Admins_admin_id",
                table: "Schedules",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_AspNetUsers_user_id",
                table: "Schedules",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_AspNetUsers_user_id",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Admins_admin_id",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_AspNetUsers_user_id",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Clients_client_id",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_AspNetUsers_user_id",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Admins_admin_id",
                table: "Schedules");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_AspNetUsers_user_id",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_user_id",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_user_id",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Message_user_id",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_user_id",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "Appointments");

            migrationBuilder.AlterColumn<int>(
                name: "admin_id",
                table: "Schedules",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "client_id",
                table: "Notifications",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "admin_id",
                table: "Notifications",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "client_id",
                table: "Message",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "admin_id",
                table: "Message",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "client_id",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Admins_admin_id",
                table: "Message",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Clients_client_id",
                table: "Message",
                column: "client_id",
                principalTable: "Clients",
                principalColumn: "client_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Admins_admin_id",
                table: "Schedules",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

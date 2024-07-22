using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarotAppointment.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminForeignKeyToService : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Admins_admin_id",
                table: "Services");

            migrationBuilder.AlterColumn<int>(
                name: "admin_id",
                table: "Services",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "user_id",
                table: "Services",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Services_user_id",
                table: "Services",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Admins_admin_id",
                table: "Services",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_AspNetUsers_user_id",
                table: "Services",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Admins_admin_id",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_AspNetUsers_user_id",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_user_id",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "Services");

            migrationBuilder.AlterColumn<int>(
                name: "admin_id",
                table: "Services",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Admins_admin_id",
                table: "Services",
                column: "admin_id",
                principalTable: "Admins",
                principalColumn: "admin_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

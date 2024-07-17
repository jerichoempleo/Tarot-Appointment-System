using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace React_Asp.Migrations
{
    /// <inheritdoc />
    public partial class renametostudentid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "Student",
                newName: "student_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "student_id",
                table: "Student",
                newName: "id");
        }
    }
}

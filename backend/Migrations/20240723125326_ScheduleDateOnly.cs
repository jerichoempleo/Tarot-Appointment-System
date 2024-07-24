using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarotAppointment.Migrations
{
    /// <inheritdoc />
    public partial class ScheduleDateOnly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Alter the column from DateTime to DateOnly (as string in SQL)
            migrationBuilder.AlterColumn<string>(
                name: "date",
                table: "Schedules",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }


        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Revert the column from DateOnly (as string in SQL) to DateTime
            migrationBuilder.AlterColumn<DateTime>(
                name: "date",
                table: "Schedules",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "date");
        }
       
    }
}

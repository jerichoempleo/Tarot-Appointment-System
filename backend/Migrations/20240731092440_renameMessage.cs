using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TarotAppointment.Migrations
{
    /// <inheritdoc />
    public partial class removescheduleID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.DropForeignKey(
                name: "FK_Message_AspNetUsers_user_id",
                table: "Message");

          
            migrationBuilder.DropPrimaryKey(
                name: "PK_Message",
                table: "Message");

            

            migrationBuilder.RenameTable(
                name: "Message",
                newName: "Messages");

            migrationBuilder.RenameIndex(
                name: "IX_Message_user_id",
                table: "Messages",
                newName: "IX_Messages_user_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Messages",
                table: "Messages",
                column: "message_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_user_id",
                table: "Messages",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_user_id",
                table: "Messages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Messages",
                table: "Messages");

            migrationBuilder.RenameTable(
                name: "Messages",
                newName: "Message");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_user_id",
                table: "Message",
                newName: "IX_Message_user_id");

         

            migrationBuilder.AddPrimaryKey(
                name: "PK_Message",
                table: "Message",
                column: "message_id");

            

          

            migrationBuilder.AddForeignKey(
                name: "FK_Message_AspNetUsers_user_id",
                table: "Message",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

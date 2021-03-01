using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class testMigration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Accounts_Address1Id",
                table: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_Address2Id",
                table: "Accounts");

            migrationBuilder.AlterColumn<int>(
                name: "Address2Id",
                table: "Accounts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Address1Id",
                table: "Accounts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Address1Id",
                table: "Accounts",
                column: "Address1Id",
                unique: true,
                filter: "[Address1Id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Address2Id",
                table: "Accounts",
                column: "Address2Id",
                unique: true,
                filter: "[Address2Id] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Accounts_Address1Id",
                table: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_Address2Id",
                table: "Accounts");

            migrationBuilder.AlterColumn<int>(
                name: "Address2Id",
                table: "Accounts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Address1Id",
                table: "Accounts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Address1Id",
                table: "Accounts",
                column: "Address1Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Address2Id",
                table: "Accounts",
                column: "Address2Id",
                unique: true);
        }
    }
}

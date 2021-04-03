using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class testmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StatementFieldInputs_ClientStatementId_StatementFieldId",
                table: "StatementFieldInputs");

            migrationBuilder.CreateIndex(
                name: "IX_StatementFieldInputs_ClientStatementId_StatementFieldId",
                table: "StatementFieldInputs",
                columns: new[] { "ClientStatementId", "StatementFieldId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StatementFieldInputs_ClientStatementId_StatementFieldId",
                table: "StatementFieldInputs");

            migrationBuilder.CreateIndex(
                name: "IX_StatementFieldInputs_ClientStatementId_StatementFieldId",
                table: "StatementFieldInputs",
                columns: new[] { "ClientStatementId", "StatementFieldId" });
        }
    }
}

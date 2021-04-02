using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class StatementEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedStatementId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ClientStatements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    RevisionYear = table.Column<int>(type: "int", nullable: false),
                    AssignedUserId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientStatements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientStatements_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientStatements_Users_AssignedUserId",
                        column: x => x.AssignedUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StatementFields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    TaxPerMille = table.Column<float>(type: "real", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatementFields", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StatementFieldInputs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientStatementId = table.Column<int>(type: "int", nullable: false),
                    StatementFieldId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    TaxPerMille = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatementFieldInputs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StatementFieldInputs_ClientStatements_ClientStatementId",
                        column: x => x.ClientStatementId,
                        principalTable: "ClientStatements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StatementFieldInputs_StatementFields_StatementFieldId",
                        column: x => x.StatementFieldId,
                        principalTable: "StatementFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientStatements_AccountId_RevisionYear",
                table: "ClientStatements",
                columns: new[] { "AccountId", "RevisionYear" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClientStatements_AssignedUserId",
                table: "ClientStatements",
                column: "AssignedUserId",
                unique: true,
                filter: "[AssignedUserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_StatementFieldInputs_ClientStatementId_StatementFieldId",
                table: "StatementFieldInputs",
                columns: new[] { "ClientStatementId", "StatementFieldId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StatementFieldInputs_StatementFieldId",
                table: "StatementFieldInputs",
                column: "StatementFieldId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StatementFieldInputs");

            migrationBuilder.DropTable(
                name: "ClientStatements");

            migrationBuilder.DropTable(
                name: "StatementFields");

            migrationBuilder.DropColumn(
                name: "AssignedStatementId",
                table: "Users");
        }
    }
}

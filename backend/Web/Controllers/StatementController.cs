using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Statements;
using Application.Statements.Commands.CreateStatementCommand;
using Application.Statements.Queries.GetMyStatements;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class StatementController : ApiControllerBase
  {
    [HttpGet("mystatements")]
    public async Task<ActionResult<List<StatementDto>>> GetClientStatements()
    {
      return await Mediator.Send(new GetMyStatementsQuery());
    }

    [HttpPost("statement")]
    public async Task<ActionResult<int>> CreateStatement([FromBody] CreateStatementCommand command)
    {
      return await Mediator.Send(command);
    }
  }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ClientStatements;
using Application.ClientStatements.Commands.CreateClientStatementCommand;
using Application.ClientStatements.Queries.GetClientStatements;
using Application.StatementFields;
using Application.StatementFields.Queries.GetStatementFieldsQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class StatementController : ApiControllerBase
  {
    [HttpGet("statementfields")]
    public async Task<ActionResult<List<StatementFieldDto>>> GetAllStatementFields()
    {
      return await Mediator.Send(new GetStatementFieldsQuery());
    }

    [HttpGet("mystatements")]
    public async Task<ActionResult<List<ClientStatementDto>>> GetClientStatements()
    {
      return await Mediator.Send(new GetClientStatementsQuery());
    }

    [HttpPost("statement")]
    public async Task<ActionResult<int>> CreateStatement([FromBody] CreateClientStatementCommand command)
    {
      return await Mediator.Send(command);
    }
  }
}

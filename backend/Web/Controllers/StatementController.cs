using System.Collections.Generic;
using System.Threading.Tasks;
using Application.StatementFields;
using Application.StatementFields.Queries.GetStatementFieldsQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class StatementController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<StatementFieldDto>>> GetAllStatementFields()
    {
      return await Mediator.Send(new GetStatementFieldsQuery());
    }
  }
}

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Accounts.Queries.GetClientsQuery;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<AccountDto>>> GetAllClients()
    {
      return await Mediator.Send(new GetClientsQuery());
    }

  }
}

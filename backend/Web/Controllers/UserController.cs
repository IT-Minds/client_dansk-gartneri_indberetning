using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Queries.GetClientsQuery;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetAllClients()
    {
      return await Mediator.Send(new GetClientsQuery());
    }

  }
}

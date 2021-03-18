using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Commands.CreateAccountantCommand;
using Application.Users.Commands.UpdateUserCommand;
using Application.Users.Queries.GetAdminsQuery;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetAllAdmins()
    {
      return await Mediator.Send(new GetAdminsQuery());
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateAndAddAccountant([FromBody] CreateAccountantCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser([FromRoute] int id, UpdateUserCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }
  }
}

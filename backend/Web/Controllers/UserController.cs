using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Commands.DeactivateUserCommand;
using Application.Users.Commands.UpdateUserCommand;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetAllAdmins()
    {
      throw new NotImplementedException();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser([FromRoute] int id, UpdateUserCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }

    [HttpPut("deactivate/{id}")]
    public async Task<ActionResult> DeactivateUser([FromRoute] int id)
    {
      await Mediator.Send(new DeactivateUserCommand
      {
        Id = id
      });

      return NoContent();
    }
  }
}

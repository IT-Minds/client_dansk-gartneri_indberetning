using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users.Commands.CheckAuthCommand;
using Application.Users;
using Application.Users.Commands.Login;
using Microsoft.Extensions.Primitives;

namespace Web.Controllers
{

  public class AuthController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<UserTokenDto>> Login([FromBody] LoginCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut]
    public async Task<ActionResult<UserDto>> CheckAuth()
    {
      var result = await Mediator.Send(new CheckAuthCommand());
      return result;
    }

    [HttpPost("activate")]
    public void ActivateUser([FromQuery] string token)
    {
      HttpContext.Response.Headers.Add(new KeyValuePair<string, StringValues>("token", token));
      HttpContext.Response.Redirect("http://localhost:3000/accounts");
    }
  }
}

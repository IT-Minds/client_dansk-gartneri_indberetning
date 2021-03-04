using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Accounts.Commands.CheckAuthCommand;
using Application.Accounts.Commands.CreateAccountCommand;

namespace Web.Controllers
{

  public class AuthController : ApiControllerBase
  {
    private static string TEMP_TOKEN = "abs";

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
  }
}

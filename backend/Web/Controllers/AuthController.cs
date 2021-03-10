using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Accounts.Commands.CreateAccountCommand;

namespace Web.Controllers
{

  public class AuthController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<UserTokenDto>> Login([FromBody] LoginCommand command)
    {
      return await Mediator.Send(command);
    }
  }
}

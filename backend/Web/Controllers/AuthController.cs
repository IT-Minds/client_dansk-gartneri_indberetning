using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Commands.Login;

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

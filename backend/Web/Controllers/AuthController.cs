using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Application.Accounts;
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
    public ActionResult<bool> CheckAuth()
    {
      if (!Request.Headers.TryGetValue("Authorization", out var auth)) {
        return false;
      }

      Regex r = new Regex(@"^Bearer (\S+)$", RegexOptions.IgnoreCase);
      Match m = r.Match(auth);
      var g = m.Groups[1].Captures[0].Value;

      return g == TEMP_TOKEN;
    }
  }
}

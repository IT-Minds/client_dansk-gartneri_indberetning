using System.IdentityModel.Tokens.Jwt;
using Application.Common.Interfaces;

namespace Application.Common.Security
{
  public class SSOTokenValidator
  {
    private readonly IApplicationDbContext _context;

    public SSOTokenValidator(IApplicationDbContext context)
    {
      _context = context;
    }

    public void ValidateToken(string tokenstring)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.ReadJwtToken(tokenstring);
    }
  }
}

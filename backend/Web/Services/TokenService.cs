using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
namespace Web.Services
{
  public class TokenService : ITokenService
  {
    private const double EXPIRE_HOURS = 4.0;
    private const double SSO_EXPIRE_DAYS = 7.0;
    private readonly TokenOptions _options;
    private readonly IApplicationDbContext _context;
    public TokenService(IOptions<TokenOptions> options, IApplicationDbContext context)
    {
      _options = options.Value;
      _context = context;
    }
    public string CreateToken(IUser user)
    {
      var claims = new List<Claim>();
      claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
      claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));

      var key = Encoding.ASCII.GetBytes(_options.Secret);
      var tokenHandler = new JwtSecurityTokenHandler();
      var descriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddHours(EXPIRE_HOURS),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(descriptor);
      return tokenHandler.WriteToken(token);
    }

    public async Task<string> CreateSSOToken(IUser user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();

      //Check if the user is already assigned a SSO token that is not expired yet.
      var res = await _context.ssoTokens
        .Where(t => t.UserId == user.Id)
        .FirstOrDefaultAsync();

      if (res != null)
      {
        var t = tokenHandler.ReadToken(res.Token);
        if (t.ValidTo.CompareTo(DateTime.Now) > 0)
        {
          throw new SecurityTokenException("This user is already issued a SSO token that is not yet expired.");
        }
      }
      

      var claims = new List<Claim>();
      claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
      //Give the token a unique identifier
      claims.Add(new Claim("jti", Guid.NewGuid().ToString()));

      var key = Encoding.ASCII.GetBytes(_options.Secret);
      var descriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddHours(SSO_EXPIRE_DAYS),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(descriptor);
      var tokenstring = tokenHandler.WriteToken(token);

      //Persist token
      var tokenEntity = new SSOToken
      {
        UserId = 
        Id = token.Id,
        Token = tokenstring
      };
      _context.ssoTokens.Add(tokenEntity);
      _context.SaveChanges();

      return tokenstring;
    }

    public async Task<bool> ValidateSSOToken(string tokenstring)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      //var token = tokenHandler.ReadToken(tokenstring);

      var key = Encoding.ASCII.GetBytes(_options.Secret);

      try
      {
        tokenHandler.ValidateToken(tokenstring, new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false
        }, out SecurityToken validatedToken);

        var persistedTokenEntity = await _context.ssoTokens.FindAsync(validatedToken.Id);

        if (persistedTokenEntity == null)
        {
          return false;
        }

        _context.ssoTokens.Remove(persistedTokenEntity);
        _context.SaveChanges();
        return true;
      }
      catch
      {
        return false;
      }
    }

  }
}

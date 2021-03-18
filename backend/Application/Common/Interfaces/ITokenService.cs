using Domain.Entities;
namespace Application.Common.Interfaces
{
  public interface ITokenService
  {
    string CreateToken(IUser user);
    string CreateSSOToken(IUser user);
  }
}

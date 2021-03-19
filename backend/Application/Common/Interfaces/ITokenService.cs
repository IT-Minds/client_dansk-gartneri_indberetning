using System.Threading.Tasks;
using Domain.Entities;
namespace Application.Common.Interfaces
{
  public interface ITokenService
  {
    string CreateToken(IUser user);
    Task<string> CreateSSOToken(IUser user);
    Task<IUser> ValidateSSOToken(string token);
  }
}

using Application.Accounts;

namespace Application.Accounts
{
  public class UserTokenDto
  {
    public UserDto User { get; set; }
    public string Token { get; set; }
  }
}

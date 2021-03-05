using Application.Accounts;

namespace Application.Users
{
  public class UserTokenDto
  {
    public UserDto User { get; set; }
    public string Token { get; set; }
  }
}

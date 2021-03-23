using System.Linq;
using Domain.Entities;
using Domain.Enums;

namespace Domain.EntityExtensions
{
  public static class AccountExtensions
  {
    public static User GetClient(this Account account)
    {
      return account.Users.First(u => u.Role == RoleEnum.Client);
    }
    public static User GetActiveAccountant(this Account account)
    {
      try
      {
        return account.Users.First(u => u.Role == RoleEnum.Accountant && u.DeactivationTime == null);
      }
      catch
      {
        return null;
      }
    }
  }
}

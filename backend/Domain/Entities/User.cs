using Domain.Enums;
using System;

namespace Domain.Entities
{
  public class User : BaseUser
  {
    private RoleEnum _role;

    public override RoleEnum Role
    {
      get => _role;
      set
      {
        if (value == RoleEnum.Admin)
          throw new ArgumentException("A User (client or accountant) may not be an admin");
        _role = value;
      }
    }
    public int AccountId { get; set; }
    public virtual Account Account { get; set; }

    public int Address1Id { get; set; }
    public virtual Address Address1 { get; set; }

    public int Address2Id { get; set; }
    public virtual Address Address2 { get; set; }

    public string Tel { get; set; }
    public int CVRNumber { get; set; }
  }
}

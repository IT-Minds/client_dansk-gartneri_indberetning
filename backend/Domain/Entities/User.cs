using Domain.Enums;
using System;

namespace Domain.Entities
{
  public class User : BaseUser
  {
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

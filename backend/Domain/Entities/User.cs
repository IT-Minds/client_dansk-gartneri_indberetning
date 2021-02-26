using Domain.Enums;
using System;

namespace Domain.Entities
{
  public class User : BaseUser
  {
    public int AccountId { get; set; }
    public virtual Account Account { get; set; }
  }
}

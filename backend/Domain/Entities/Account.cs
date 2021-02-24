
using System.Collections.Generic;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Account
  {
    public int ID { get; set;}
    public ICollection<int> UserIDs { get; set; }
    public virtual ICollection<Schema> Schemas { get; set; }
  }
}
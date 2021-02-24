
using System.Collections.Generic;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Account : AuditableEntity
  {
    public int ID { get; set;}
    public string Name { get; set; }
    public string Tlf { get; set; }
    public ICollection<int> UserIDs { get; set; }
  }
}
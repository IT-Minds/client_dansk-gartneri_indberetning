
using System.Collections.Generic;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Account : AuditableEntity
  {
    public int Id { get; set;}
    public string Name { get; set; }
    public string Tel { get; set; }
    public virtual ICollection<User> Users { get; set; }
  }
}
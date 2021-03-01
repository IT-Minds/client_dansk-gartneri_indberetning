
using System.Collections.Generic;
using Domain.Common;
using System;

namespace Domain.Entities
{
  public class Account : AuditableEntity
  {
    public int Id { get; set;}
    public string Name { get; set; }
    public string Email { get; set; }
    public string Tel { get; set; }

    public int? Address1Id { get; set; }
    public virtual Address? Address1 { get; set; }
    public int? Address2Id { get; set; }
    public virtual Address? Address2 { get; set; }

    public string CVRNumber { get; set; }
    public virtual ICollection<User> Users { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}

using Domain.Common;
using Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
  public class User : AuditableEntity
  {
    public int Id { get; set; }
    public int AccountId { get; set; }
    public virtual Account Account { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public RoleEnum Role { get; set; }
    public string Name { get; set; }

    public int Address1Id { get; set; }
    public virtual Address Address1 { get; set; }

    public int Address2Id { get; set; }
    public virtual Address Address2 { get; set; }

    public string Tel { get; set; }
    public int CVRNumber { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}

using Domain.Common;
using Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
  public abstract class BaseUser : AuditableEntity
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public virtual RoleEnum Role { get; set; }
    public string Name { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}

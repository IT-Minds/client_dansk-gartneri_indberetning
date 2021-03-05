using Domain.Common;
using Domain.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
  public interface IUser
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public RoleEnum Role { get; }
    public string Name { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}

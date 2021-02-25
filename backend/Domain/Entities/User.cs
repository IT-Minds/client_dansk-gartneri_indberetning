using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class User : AuditableEntity
  {
    public int Id { get; set; }
    public int AccountID { get; set; }
    public virtual Account Account { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public RoleEnum Role { get; set; }
    public string Name { get; set; }
    public virtual Address Address1 { get; set; }
    public virtual Address Address2 { get; set; }
    public string Tel { get; set; }
    public int CVRNumber { get; set; }
  }
}

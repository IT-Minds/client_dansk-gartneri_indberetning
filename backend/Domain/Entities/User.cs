using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class User : AuditableEntity
  {
    public int Id { get; set; }
    public int AccountID { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public ICollection<Role> Roles { get; set; }
    public string Name { get; set; }
    public virtual Address Address { get; set; }
    public string Tlf { get; set; }
    public int CVRNumber { get; set; }
    public int SENumber { get; set; }
  }
}

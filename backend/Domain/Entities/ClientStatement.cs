using System.Collections.Generic;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class ClientStatement : AuditableEntity
  {
    public int Id { get; set; }
    public int AccountId { get; set; }
    public virtual Account Account { get; set; }
    public int RevisionYear { get; set; }
    public int? AssignedUserId { get; set; }
    public virtual User AssignedUser { get; set; }
    public StatementStatus Status { get; set; }
    public virtual ICollection<CropTurnover> CropTurnovers {get; set;}
  }
}

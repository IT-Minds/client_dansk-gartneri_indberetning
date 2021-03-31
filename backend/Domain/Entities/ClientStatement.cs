using Domain.Common;

namespace Domain.Entities
{
  public class ClientStatement : AuditableEntity
  {
    public int Id { get; set; }
    public int AccountId { get; set; }
    public int RevisionYear { get; set; }
    public StatementForm StatementForm { get; set; }
    public int AssignedUserId { get; set; }
    public bool IsSignedOff { get; set; }
  }
}

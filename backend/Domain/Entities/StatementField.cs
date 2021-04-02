using System.Collections.Generic;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class StatementField : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public float TaxPerMille { get; set; }
    public StatementCategory Category { get; set; }
    public virtual ICollection<StatementFieldInput> StatementFieldInputs { get; set; }
  }
}

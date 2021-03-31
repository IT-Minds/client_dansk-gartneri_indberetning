using System.Collections.Generic;
using Domain.Common;

namespace Domain.Entities
{
  public class CropCategory : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public float TaxPerMille { get; set; }

    public virtual ICollection<CropTurnover> CropTurnovers { get; set; }
  }
}

using Application.Common.Mappings;
using Domain.Entities;

namespace Application.StatementFields
{
  public class StatementFieldDto : IAutoMap<StatementField>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public float TaxPerMille { get; set; }
  }
}

using Application.ClientStatements;
using Application.Common.Mappings;
using Application.StatementFields;
using Domain.Entities;

namespace Application.StatementFieldInputs
{
  public class StatementFieldInputDto : IAutoMap<StatementFieldInput>
  {
    public int Id { get; set; }
    public int ClientStatementId { get; set; }
    public virtual ClientStatementDto ClientStatement { get; set; }
    public int StatementFieldId { get; set; }
    public virtual StatementFieldDto StatementField { get; set; }
    public int Value { get; set; }
    public float TaxPerMille { get; set; }
  }
}

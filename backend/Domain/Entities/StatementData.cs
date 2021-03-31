namespace Domain.Entities
{
  public class StatementData
  {
    public int Id { get; set; }
    public int ClientStatementId { get; set; }
    public virtual ClientStatement ClientStatement { get; set; }
    public int StatementFieldId { get; set; }
    public virtual StatementField StatementField { get; set; }
    public int Value { get; set; }
    public float TaxPerMille { get; set; } //To be able to retrieve what the taxation was for that particular year.
  }
}

namespace Domain.Entities
{
  public class CropTurnover
  {
    public int Id { get; set; }
    public int ClientStatementId { get; set; }
    public virtual ClientStatement ClientStatement { get; set; }
    public int CropCategoryId { get; set; }
    public virtual CropCategory CropCategory { get; set; }
    public int Turnover { get; set; }
    public float TaxPerMille { get; set; } //To be able to retrieve what the taxation was for that particular year.
  }
}

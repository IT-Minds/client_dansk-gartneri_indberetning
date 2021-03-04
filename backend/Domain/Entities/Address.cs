using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Address
  {
    public int Id { get; set; }
    public int AccountId { get; set; }
    public virtual Account Account { get; set; }

    public string StreetName1 { get; set; }
    public string StreetNumber1 { get; set; }
    public string PostCode1 { get; set; }
    public string City1 { get; set; }
    public string Country1 { get; set; }

    public string StreetName2 { get; set; }
    public string StreetNumber2 { get; set; }
    public string PostCode2 { get; set; }
    public string City2 { get; set; }
    public string Country2 { get; set; }
  }
}

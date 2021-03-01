using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Address
  {
    public int Id { get; set; }
    public string StreetName { get; set; }
    public string StreetNumber { get; set; }
    public string PostCode { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public int AccountId { get; set; }
    public virtual Account Account { get; set; }
  }
}

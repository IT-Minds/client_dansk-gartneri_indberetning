using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Address
  {
    public int UserID { get; set; }
    public string StreetName { get; set; }
    public string StreetNumber { get; set;}
    public int PostCode { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
  }
}

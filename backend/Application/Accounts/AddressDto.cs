using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Accounts
{
  public class AddressDto : IAutoMap<Address>
  {
    public string StreetName { get; set; }
    public string StreetNumber { get; set; }
    public string PostCode { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<Address, AddressDto>();
    }
  }
}

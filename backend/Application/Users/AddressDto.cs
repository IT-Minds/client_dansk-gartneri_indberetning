using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Users
{
  public class AddressDto : IAutoMap<Address>
  {
    public int UserId { get; set; }
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

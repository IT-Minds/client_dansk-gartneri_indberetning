using Application.Common.Mappings;
using Domain.Entities;
using Domain.Enums;
using System;
using AutoMapper;

namespace Application.Accounts
{
  public class UserDto : IAutoMap<User>
  {
    public int AccountId { get; set; }
    public string Email { get; set; }
    public RoleEnum Role { get; set; }
    public string Name { get; set; }
    public AddressDto Address1 { get; set; }
    public AddressDto Address2 { get; set; }
    public string Tel { get; set; }
    public int CVRNumber { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<User, UserDto>();
    }
  }
}

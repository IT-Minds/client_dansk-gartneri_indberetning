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
    public DateTimeOffset? DeactivationTime { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<BaseUser, UserDto>();
    }
  }
}

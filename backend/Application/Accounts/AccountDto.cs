using System;
using System.Collections.Generic;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Accounts
{
  public class AccountDto : IAutoMap<Account>
  {
    public string Name { get; set; }
    public string Email { get; set; }
    public string Tel { get; set; }
    public int Address1Id { get; set; }
    public int Address2Id { get; set; }
    public string CVRNumber { get; set; }
    public DateTimeOffset DeactivationTime { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<Account, AccountDto>();
    }
  }
}

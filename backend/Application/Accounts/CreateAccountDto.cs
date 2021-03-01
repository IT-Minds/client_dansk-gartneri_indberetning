using System;
using System.Collections.Generic;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Accounts
{
  public class CreateAccountDto : IAutoMap<Account>
  {
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string Tel { get; set; }
    public AddressDto Address1 { get; set; }
    public AddressDto? Address2 { get; set; }
    public string CVRNumber { get; set; }
  }
}

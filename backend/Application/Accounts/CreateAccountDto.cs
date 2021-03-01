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
    public string Pasword { get; set; }
    public string Name { get; set; }
    public string Tel { get; set; }
    public int Address1Id { get; set; }
    public AddressDto Address1 { get; set; }
    public int Address2Id { get; set; }
    public AddressDto Address2 { get; set; }
    public int CVRNumber { get; set; }
  }
}

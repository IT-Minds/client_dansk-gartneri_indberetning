using System;
using System.Collections.Generic;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Accounts
{
  public class AccountDto : IAutoMap<Account>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Tel { get; set; }
    public int Address1Id { get; set; }
    public AddressDto Address1 { get; set; }
    public int Address2Id { get; set; }
    public AddressDto Address2 { get; set; }
    public string CVRNumber { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
    public ICollection<UserDto> Users { get; set; }
  }
}

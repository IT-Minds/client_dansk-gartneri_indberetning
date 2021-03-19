using System;

namespace Domain.Entities
{
  public class SSOToken
  {
    public int UserId { get; set; }
    public string Id { get; set; }
    public string Token { get; set; }
  }
}

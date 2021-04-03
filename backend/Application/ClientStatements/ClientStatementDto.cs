using System.Collections.Generic;
using Application.Accounts;
using Application.Common.Mappings;
using Application.StatementFieldInputs;
using Application.Users;
using Domain.Entities;
using Domain.Enums;

namespace Application.ClientStatements
{
  public class ClientStatementDto : IAutoMap<ClientStatement>
  {
    public int Id { get; set; }
    public int AccountId { get; set; }
    public virtual AccountDto Account { get; set; }
    public int RevisionYear { get; set; }
    public int? AssignedUserId { get; set; }
    public virtual UserAccountIdDto AssignedUser { get; set; }
    public StatementStatus Status { get; set; }
    public virtual ICollection<StatementFieldInputDto> StatementFieldInputs { get; set; }
  }
}

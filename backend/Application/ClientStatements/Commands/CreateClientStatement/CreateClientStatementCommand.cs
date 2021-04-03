using System.Collections.Generic;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Security;
using Domain.EntityExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.ClientStatements.Commands.CreateClientStatementCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateClientStatementCommand : IRequest<int>
  {
    public int AccountId { get; set; }
    public int RevisionYear { get; set; }

    public class CreateClientStatementCommandHandler : IRequestHandler<CreateClientStatementCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateClientStatementCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateClientStatementCommand request, CancellationToken cancellationToken)
      {
        var accountEntity = await _context.Accounts
          .Include(e => e.Users)
          .FirstOrDefaultAsync(e => e.Id == request.AccountId);

        if (accountEntity == null)
        {
          throw new NotFoundException(nameof(Account), request.AccountId);
        }

        var statement = new ClientStatement
        {
          AccountId = request.AccountId,
          Account = accountEntity,
          RevisionYear = request.RevisionYear,
          AssignedUserId = accountEntity.GetClient().Id,
          AssignedUser = accountEntity.GetClient(),
          Status = StatementStatus.Unsigned
        };
        _context.ClientStatements.Add(statement);

        foreach (var field in _context.StatementFields)
        {
          var statementFieldInput = new StatementFieldInput
          {
            ClientStatementId = statement.Id,
            ClientStatement = statement,
            StatementFieldId = field.Id,
            StatementField = field,
            TaxPerMille = field.TaxPerMille
          };
          _context.StatementFieldInputs.Add(statementFieldInput);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return statement.Id;
      }
    }
  }
}

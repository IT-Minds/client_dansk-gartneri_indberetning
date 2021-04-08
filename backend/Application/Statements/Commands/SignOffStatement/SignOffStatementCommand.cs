using System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Domain.Enums;

namespace Application.Statements.Commands.SignOffStatement
{
  [Authenticated]
  public class SignOffStatementcommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }

    public class SignOffStatementcommandHandler : IRequestHandler<SignOffStatementcommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;

      public SignOffStatementcommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
      {
        _context = context;
        _currentUser = currentUser;
      }

      public async Task<Unit> Handle(SignOffStatementcommand request, CancellationToken cancellationToken)
      {
        var statementEntity = await _context.Statements.FindAsync(request.Id);

        if (statementEntity == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        if (statementEntity.Status == StatementStatus.SignedOff)
        {
          throw new InvalidOperationException("Statement is already signed off.");
        }

        var currentUser = await _context.Users.FindAsync(int.Parse(_currentUser.UserId));
        if (statementEntity.AccountId != currentUser.AccountId)
        {
          throw new UnauthorizedAccessException("Tried to sign off a statement that belongs to another account");
        }

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}

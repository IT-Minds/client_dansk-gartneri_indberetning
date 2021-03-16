using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Application.ExampleChildren;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.Users.Commands.UpdateAccountantCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class UpdateAccountantCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public UserAccountIdDto Accountant { get; set; }


    public class UpdateAccountantCommandHandler : IRequestHandler<UpdateAccountantCommand>
    {
      private readonly IApplicationDbContext _context;

      public UpdateAccountantCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(UpdateAccountantCommand request, CancellationToken cancellationToken)
      {
        var accountantEntity = await _context.Users.FindAsync(request.Id);

        if (accountantEntity == null)
        {
          throw new NotFoundException(nameof(User), request.Id);
        }

        if (!await _context.Accounts.AnyAsync(e => e.Id == request.Accountant.AccountId, cancellationToken))
        {
          throw new NotFoundException(nameof(Account), request.Accountant.AccountId);
        }

        var newAccountEntity = await _context.Accounts.FindAsync(request.Accountant.AccountId);

        if (newAccountEntity == null)
        {
          throw new NotFoundException(nameof(Account), request.Accountant.AccountId);
        }

        accountantEntity.Name = request.Accountant.Name;
        accountantEntity.Email = request.Accountant.Email;
        accountantEntity.AccountId = request.Accountant.AccountId;
        accountantEntity.Account = newAccountEntity;
        accountantEntity.DeactivationTime = request.Accountant.DeactivationTime;

        _context.Users.Update(accountantEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}

using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Accounts.Commands.CreateAccountCommand
{
  public class CreateAccountCommand : IRequest<int>
  {
    public CreateAccountDto account;

    public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateAccountCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
      {
        var accountEntity = new Account
        {
          Name = request.account.Name,
          Email = request.account.Email,
          Tel = request.account.Tel,
          CVRNumber = request.account.CVRNumber
        };

        _context.Accounts.Add(accountEntity);
        await _context.SaveChangesAsync(cancellationToken);

        var userEntity = new User
        {
          AccountId = accountEntity.Id,
          Account = accountEntity,
          Email = accountEntity.Email,
          Password = request.account.Password,
          Role = RoleEnum.Client,
          Name = request.account.Name
        };

        _context.Users.Add(userEntity);
        await _context.SaveChangesAsync(cancellationToken);

        var address1Entity = new Address
        {
          StreetName = request.account.Address1.StreetName,
          StreetNumber = request.account.Address1.StreetNumber,
          PostCode = request.account.Address1.PostCode,
          City = request.account.Address1.City,
          Country = request.account.Address1.Country,
          AccountId = accountEntity.Id,
          Account = accountEntity
        };
        _context.Addresses.Add(address1Entity);

        Address address2Entity = null;
        if (request.account.Address2 != null)
        {
          address2Entity = new Address
          {
            StreetName = request.account.Address2.StreetName,
            StreetNumber = request.account.Address2.StreetNumber,
            PostCode = request.account.Address2.PostCode,
            City = request.account.Address2.City,
            Country = request.account.Address2.Country,
            AccountId = accountEntity.Id,
            Account = accountEntity
          };
          _context.Addresses.Add(address2Entity);
        };

        await _context.SaveChangesAsync(cancellationToken);

        accountEntity.Address1 = address1Entity;
        accountEntity.Address1Id = address1Entity.Id;
        if (address2Entity != null)
        {
          accountEntity.Address2 = address2Entity;
          accountEntity.Address2Id = address2Entity.Id;
        }
        await _context.SaveChangesAsync(cancellationToken);

        return accountEntity.Id;
      }
    }
  }
}

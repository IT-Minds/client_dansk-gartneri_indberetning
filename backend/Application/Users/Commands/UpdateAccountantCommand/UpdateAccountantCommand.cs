using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.ExampleChildren;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.Users.Commands.UpdateAccountantCommand
{
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

        if (!await _context.ExampleParents.AnyAsync(e => e.Id == request.Accountant.ParentId, cancellationToken))
        {
          throw new NotFoundException(nameof(ExampleParent), request.Child.ParentId);
        }

        exampleEntity.Name = request.Child.Name;
        exampleEntity.Type = request.Child.Type;
        exampleEntity.ParentId = request.Child.ParentId;

        _context.ExampleChildren.Update(exampleEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.ClientStatements.Queries.GetClientStatements
{
  [Authenticated]
  public class GetClientStatementsQuery : IRequest<List<ClientStatementDto>>
  {
    public int RevisionYear { get; set; }

    public class GetClientStatementsQueryHandler : IRequestHandler<GetClientStatementsQuery, List<ClientStatementDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUser;

      public GetClientStatementsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
      {
        _context = context;
        _mapper = mapper;
        _currentUser = currentUser;
      }
      public async Task<List<ClientStatementDto>> Handle(GetClientStatementsQuery request, CancellationToken cancellationToken)
      {
        var currentUser = await _context.Users.FindAsync(int.Parse(_currentUser.UserId));

        var statement = await _context.ClientStatements
          .Where(e => e.AccountId == currentUser.AccountId)
          .Include(x => x.StatementFieldInputs)
          .ProjectTo<ClientStatementDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return statement;
      }
    }
  }
}

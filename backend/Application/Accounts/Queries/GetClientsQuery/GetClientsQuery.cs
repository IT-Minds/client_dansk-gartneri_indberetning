using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.Accounts.Queries.GetClientsQuery
{
  public class GetClientsQuery : IRequest<List<AccountDto>>
  {
    public class GetClientsQueryHandler : IRequestHandler<GetClientsQuery, List<AccountDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetClientsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<AccountDto>> Handle(GetClientsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.Accounts
          .Include(x => x.Users.Where(user => user.Role == RoleEnum.Client))
          .ProjectTo<AccountDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return viewModel;
      }
    }
  }
}

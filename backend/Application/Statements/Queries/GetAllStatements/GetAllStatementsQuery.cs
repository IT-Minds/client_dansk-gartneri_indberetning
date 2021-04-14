using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Queries.GetAllStatements
{
  [Authorize(Role = RoleEnum.Admin)]
  public class GetAllStatementsQuery : IRequest<List<StatementDto>>
  {
    public int? AccountingYear { get; set; }

    public class GetAllStatementsQueryHandler : IRequestHandler<GetAllStatementsQuery, List<StatementDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetAllStatementsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<StatementDto>> Handle(GetAllStatementsQuery request, CancellationToken cancellationToken)
      {
        var statements = await _context.Statements
          .Where(e => request.AccountingYear == null || e.RevisionYear == request.AccountingYear)
          .Include(e => e.Account)
          .ProjectTo<StatementDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return statements;
      }
    }
  }
}

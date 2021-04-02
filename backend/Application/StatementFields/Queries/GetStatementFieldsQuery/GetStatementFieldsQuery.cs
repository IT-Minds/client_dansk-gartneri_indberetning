using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.ExampleChildren;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.StatementFields.Queries.GetStatementFieldsQuery
{
  public class GetStatementFieldsQuery : IRequest<List<StatementFieldDto>>
  {
    public class GetStatementFieldsQueryHandler : IRequestHandler<GetStatementFieldsQuery, List<StatementFieldDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetStatementFieldsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<StatementFieldDto>> Handle(GetStatementFieldsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.StatementFields
          .ProjectTo<StatementFieldDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return viewModel;
      }
    }
  }
}

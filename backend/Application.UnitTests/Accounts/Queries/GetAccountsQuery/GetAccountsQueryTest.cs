using Application.Accounts.Queries.GetAccountsQuery;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Xunit;

namespace Application.UnitTests.Accounts.Queries.GetAccounts
{
  [Collection("QueryTests")]
  public class GetAccountsQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAccountsQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndClientsCount()
    {
      var query = new GetAccountsQuery();

      var handler = new GetAccountsQuery.GetAccountsQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<AccountDto>>();
      result.Count.Should().Be(2);
    }
  }
}

using System.Linq;
using Application.Common.Interfaces;
using Application.Common.Options;
using Domain.Entities;
using Microsoft.Extensions.Options;
using Web.Options;

namespace Web.Services
{
  public class StatementService
  {
    private readonly IApplicationDbContext _context;
    private readonly StatementOptions _options;

    public StatementService(IApplicationDbContext context, IOptions<StatementOptions> options)
    {
      _context = context;
      _options = options.Value;
    }

    public void SetupStatementFields()
    {
      if (_context.StatementFields.Count() != 0) return;
      _context.StatementFields.AddRange(_options.StatementFields);
      _context.SaveChanges();
    }
  }

}

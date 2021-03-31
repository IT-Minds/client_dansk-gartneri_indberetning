using System.Linq;
using Application.Common.Interfaces;
using Application.Common.Options;
using Domain.Entities;
using Microsoft.Extensions.Options;
using Web.Options;

namespace Web.Services
{
  public class CropService
  {
    private readonly IApplicationDbContext _context;
    private readonly CropOptions _options;

    public CropService(IApplicationDbContext context, IOptions<CropOptions> options)
    {
      _context = context;
      _options = options.Value;
    }

    public void SetupCrops()
    {
      if (_context.CropCategories.Count() != 0) return;
      _context.CropCategories.AddRange(_options.CropCategories);
      _context.SaveChanges();
    }
  }

}

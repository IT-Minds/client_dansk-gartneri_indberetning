using System.Collections.Generic;
using Domain.Entities;

namespace Web.Options
{
  public class CropOptions
  {
    public const string Crops = "Crops";
    public List<CropCategory> CropCategories { get; set; }
  }
}

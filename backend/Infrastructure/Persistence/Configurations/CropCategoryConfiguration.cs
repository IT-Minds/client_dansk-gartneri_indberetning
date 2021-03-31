using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class CropCategoryConfiguration : IEntityTypeConfiguration<CropCategory>
  {
    public void Configure(EntityTypeBuilder<CropCategory> builder)
    {
      builder.Property(e => e.Name)
        .HasMaxLength(200)
        .IsRequired();

      builder.Property(e => e.TaxPerMille)
        .IsRequired();

      builder.HasMany<CropTurnover>(e => e.CropTurnovers)
        .WithOne(e => e.CropCategory);
    }
  }
}

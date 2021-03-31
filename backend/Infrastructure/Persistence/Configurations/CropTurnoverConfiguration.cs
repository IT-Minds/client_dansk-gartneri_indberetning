using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class CropTurnoverConfiguration : IEntityTypeConfiguration<CropTurnover>
  {
    public void Configure(EntityTypeBuilder<CropTurnover> builder)
    {
      builder.HasOne<ClientStatement>(e => e.ClientStatement)
        .WithMany(e => e.CropTurnovers)
        .HasForeignKey(e => e.ClientStatementId)
        .IsRequired(true);

      builder.HasOne(e => e.CropCategory)
        .WithMany(e => e.CropTurnovers)
        .HasForeignKey(e => e.CropCategoryId)
        .IsRequired();

      builder.HasIndex(e => new {e.ClientStatementId, e.CropCategoryId}).IsUnique();
    }
  }
}

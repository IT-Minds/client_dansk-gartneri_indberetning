using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class StatementFieldConfiguration : IEntityTypeConfiguration<StatementField>
  {
    public void Configure(EntityTypeBuilder<StatementField> builder)
    {
      builder.Property(e => e.Name)
        .HasMaxLength(200)
        .IsRequired();

      builder.Property(e => e.TaxPerMille)
        .IsRequired();

      builder.HasMany<StatementFieldInput>(e => e.StatementFieldInputs)
        .WithOne(e => e.StatementField);
    }
  }
}

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class StatementFieldInputConfiguration : IEntityTypeConfiguration<StatementFieldInput>
  {
    public void Configure(EntityTypeBuilder<StatementFieldInput> builder)
    {
      builder.HasOne<ClientStatement>(e => e.ClientStatement)
        .WithMany(e => e.StatementFieldInputs)
        .HasForeignKey(e => e.ClientStatementId)
        .IsRequired(true);

      builder.HasOne(e => e.StatementField)
        .WithMany(e => e.StatementFieldInputs)
        .HasForeignKey(e => e.StatementFieldId)
        .IsRequired();

      builder.HasIndex(e => new {e.ClientStatementId, e.StatementFieldId}).IsUnique();
    }
  }
}

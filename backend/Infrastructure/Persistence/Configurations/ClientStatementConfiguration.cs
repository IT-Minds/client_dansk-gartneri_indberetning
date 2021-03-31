using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ClientStatementConfiguration : IEntityTypeConfiguration<ClientStatement>
  {
    public void Configure(EntityTypeBuilder<ClientStatement> builder)
    {
      builder.HasOne<Account>(e => e.Account)
        .WithMany(e => e.ClientStatements)
        .HasForeignKey(e => e.AccountId)
        .IsRequired(true);

      builder.HasMany<CropTurnover>(e => e.CropTurnovers)
        .WithOne(e => e.ClientStatement)
        .IsRequired(true);

      builder.HasOne<User>(e => e.AssignedUser)
        .WithOne(e => e.ClientStatement)
        .HasForeignKey<ClientStatement>(e => e.AssignedUserId);

      builder.Property(e => e.Status)
        .IsRequired(true);

      builder.Property(e => e.RevisionYear)
        .IsRequired(true);

      builder.HasIndex(e => new {e.AccountId, e.RevisionYear}).IsUnique();
    }
  }
}

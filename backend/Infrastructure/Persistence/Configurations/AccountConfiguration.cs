using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AccountConfiguration : IEntityTypeConfiguration<Account>
  {
    public void Configure(EntityTypeBuilder<Account> builder)
    {
      builder.Property(e => e.Name)
        .HasMaxLength(200)
        .IsRequired();

      builder.Property(e => e.Tel)
        .IsRequired();

      builder.Property(e => e.Email)
        .IsRequired();

      builder.HasIndex(e => e.Email)
        .IsUnique();

      builder.HasMany<User>(e => e.Users)
        .WithOne(e => e.Account);

      builder.HasOne<Address>(e => e.Address1)
        .WithOne()
        .HasForeignKey<Account>(e => e.Address1Id)
        .OnDelete(DeleteBehavior.Restrict);

      builder.HasOne<Address>(e => e.Address2)
        .WithOne()
        .HasForeignKey<Account>(e => e.Address2Id)
        .OnDelete(DeleteBehavior.Restrict);

      builder.Property(e => e.CVRNumber)
        .IsRequired();
    }
  }
}

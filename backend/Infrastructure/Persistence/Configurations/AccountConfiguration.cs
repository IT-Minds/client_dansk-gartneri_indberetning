using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AccountConfiguration : IEntityTypeConfiguration<Account>
  {
    public void Configure(EntityTypeBuilder<Account> builder)
    {
      builder.HasKey(e => e.Id);

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

      builder.HasOne<Address>(e => e.Address1);

      builder.HasOne<Address>(e => e.Address2);

      builder.Property(e => e.CVRNumber)
        .IsRequired();
    }
  }
}

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class UserConfiguration : IEntityTypeConfiguration<User>
  {
    public void Configure(EntityTypeBuilder<User> builder)
    {
      builder.Property(e => e.Name)
          .HasMaxLength(200)
          .IsRequired();

      builder.HasOne<Account>(e => e.Account)
          .WithMany(e => e.Users)
          .HasForeignKey(e => e.AccountID)
          .IsRequired(true);

      builder.HasIndex(e => e.Email)
          .IsUnique();
    }
  }
}
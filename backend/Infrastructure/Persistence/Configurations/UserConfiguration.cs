using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class UserConfiguration : IEntityTypeConfiguration<User>
  {
    public void Configure(EntityTypeBuilder<User> builder)
    {
      builder.HasOne<Account>(e => e.Account)
          .WithMany(e => e.Users)
          .HasForeignKey(e => e.AccountId)
          .IsRequired(true);

      builder.Property(e => e.Email)
          .HasMaxLength(320)
          .IsRequired();

      builder.HasIndex(e => e.Email)
          .IsUnique();

      builder.Property(e => e.Role)
          .IsRequired();

      builder.Property(e => e.Name)
          .HasMaxLength(200)
          .IsRequired();
      
      

      
    }
  }
}
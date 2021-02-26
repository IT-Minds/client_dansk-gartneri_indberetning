using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class BaseUserConfiguration : IEntityTypeConfiguration<BaseUser>
  {
    public void Configure(EntityTypeBuilder<BaseUser> builder)
    {
      builder.HasKey(e => e.Id);

      builder.Property(e => e.Email)
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

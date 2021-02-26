using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class UserConfiguration : IEntityTypeConfiguration<User>
  {
    public void Configure(EntityTypeBuilder<User> builder)
    {
      builder.Property(e => e.AccountId)
          .IsRequired();

      builder.HasOne<Account>(e => e.Account)
          .WithMany(e => e.Users)
          .HasForeignKey(e => e.AccountId)
          .IsRequired(true);

      builder.HasOne<Address>(e => e.Address1);

      builder.HasOne<Address>(e => e.Address2);

      builder.Property(e=> e.CVRNumber)
          .IsRequired(); 
    }
  }
}

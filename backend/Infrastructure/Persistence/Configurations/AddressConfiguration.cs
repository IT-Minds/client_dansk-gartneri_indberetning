using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AddressConfiguration : IEntityTypeConfiguration<Address>
  {
    public void Configure(EntityTypeBuilder<Address> builder)
    {
      builder.HasOne<Account>(e => e.Account)
        .WithOne(e => e.Address)
        .HasForeignKey<Account>(e => e.Id)
        .IsRequired();

      builder.Property(e => e.StreetName1)
        .IsRequired();

      builder.Property(e => e.StreetNumber1)
        .IsRequired();

      builder.Property(e => e.PostCode1)
        .IsRequired();

      builder.Property(e => e.City1)
        .IsRequired();

      builder.Property(e => e.Country1)
        .IsRequired();
    }
  }
}

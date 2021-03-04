using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AddressConfiguration : IEntityTypeConfiguration<Address>
  {
    public void Configure(EntityTypeBuilder<Address> builder)
    {
      builder.Property(e => e.StreetName)
          .IsRequired();

      builder.Property(e => e.StreetNumber)
          .IsRequired();
      
      builder.Property(e => e.PostCode)
          .IsRequired();
      
      builder.Property(e => e.City)
          .IsRequired();

      builder.Property(e => e.Country)
        .IsRequired();
    }
  }
}

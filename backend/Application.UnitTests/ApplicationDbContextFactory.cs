using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Moq;
using System;

namespace Application.UnitTests
{
  public static class ApplicationDbContextFactory
  {
    public static ApplicationDbContext Create()
    {
      var options = new DbContextOptionsBuilder<ApplicationDbContext>()
          .ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning))
          .UseInMemoryDatabase(Guid.NewGuid().ToString())
          .Options;

      var dateTimeMock = new Mock<IDateTimeOffsetService>();
      dateTimeMock.Setup(m => m.Now)
          .Returns(new DateTimeOffset(3001, 1, 1, 1, 1, 1, TimeSpan.Zero));

      var currentUserServiceMock = new Mock<ICurrentUserService>();
      currentUserServiceMock.Setup(m => m.UserId)
          .Returns("00000000-0000-0000-0000-000000000000");

      var context = new ApplicationDbContext(options, currentUserServiceMock.Object, dateTimeMock.Object);

      context.Database.EnsureCreated();

      SeedSampleData(context);

      return context;
    }

    public static void SeedSampleData(ApplicationDbContext context)
    {
      context.ExampleParents.AddRange(
          new ExampleParent() { Id = 1, Name = "Test 1" },
          new ExampleParent() { Id = 2, Name = "Test 2" }
      );

      context.ExampleChildren.AddRange(
          new ExampleChild { Id = 1, ParentId = 1, Name = "Bread", Type = ExampleEnum.Youngest },
          new ExampleChild { Id = 2, ParentId = 1, Name = "Butter", Type = ExampleEnum.Youngest },
          new ExampleChild { Id = 3, ParentId = 1, Name = "Milk", Type = ExampleEnum.Middle },
          new ExampleChild { Id = 4, ParentId = 2, Name = "Sugar", Type = ExampleEnum.Middle },
          new ExampleChild { Id = 5, ParentId = 2, Name = "Coffee", Type = ExampleEnum.Oldest }
      );

      var account1 = new Account {Id = 1, Name = "CarrotFarm account", Tel = "59284756"};
      var account2 = new Account {Id = 2, Name = "Mushroom account", Tel = "59284756"};

      context.Accounts.AddRange(
          account1,
          account2
      );

      var address1 = new Address {Id = 1, StreetName = "Carrot Street", StreetNumber = "5", PostCode = "2200", City = "Carrotville", Country = "Denmark"};
      var address2 = new Address {Id = 2, StreetName = "Mushroom Avenue", StreetNumber = "7", PostCode = "2200", City = "Mushroom Town", Country = "Denmark"};

      context.Addresses.AddRange(
        address1,
        address2
      );

      context.Users.AddRange(
        new User { Id = 1, AccountId = 1, Account = account1, Email= "carrots@carrots.dk", Password  = "Pa$$w0rd", Role = RoleEnum.Client, Name = "CarrotFarm client", Tel = "59284756", Address1 = address1, Address1Id = address1.Id},
        new User { Id = 2, AccountId = 1, Account = account1, Email = "carrotsaccountant@carrots.dk", Password = "Pa$$w0rd", Role = RoleEnum.Accountant, Name = "CarrotFarm accountant", Tel = "47386947", Address1 = address1, Address1Id = address1.Id },
        new User { Id = 4, AccountId = 2, Account = account2, Email = "mushroom@mushrooms.dk", Password = "Pa$$w0rd", Role = RoleEnum.Client, Name = "Mushroom client", Tel = "37489634", Address1 = address2, Address1Id = address2.Id }
      );

      context.SaveChanges();
    }

    public static void Destroy(ApplicationDbContext context)
    {
      context.Database.EnsureDeleted();

      context.Dispose();
    }
  }
}

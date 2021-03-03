using System.Linq;
using FluentAssertions;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Accounts.Commands.CreateAccountCommand;
using Xunit;

namespace Application.UnitTests.Accounts.Commands.CreateAccount
{
  public class CreateAccountCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistExampleChild()
    {
      var command = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "carrots@carrots.dk",
          Name = "Carrot Farm",
          Tel = "56478657",
          Address1 = new AddressDto
          {
            StreetName = "Carrot Street",
            StreetNumber = "1",
            PostCode = "1234",
            City = "Carrotville",
            Country = "Denmark"
          },
          CVRNumber = "13243546"
        }
      };

      var handler = new CreateAccountCommand.CreateAccountCommandHandler(Context);

      var accountsCount = Context.Accounts.Count();
      var usersCount = Context.Users.Count();
      var addressCount = Context.Addresses.Count();

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Accounts.Find(result);

      entity.Should().NotBeNull();
      entity.Id.Should().Be(accountsCount + 1);
      entity.Email.Should().Be(command.account.Email);
      entity.Name.Should().Be(command.account.Name);
      entity.Tel.Should().Be(command.account.Tel);
      entity.CVRNumber.Should().Be(command.account.CVRNumber);
      entity.Address1.Should().NotBeNull();
      entity.Address1.Id.Should().Be(addressCount + 1);
      entity.Address1.Account.Should().Be(entity);
      entity.Address1.AccountId.Should().Be(entity.Id);
      entity.Address1.StreetName.Should().Be(command.account.Address1.StreetName);
      entity.Address1.StreetNumber.Should().Be(command.account.Address1.StreetNumber);
      entity.Address1.PostCode.Should().Be(command.account.Address1.PostCode);
      entity.Address1.City.Should().Be(command.account.Address1.City);
      entity.Address1.Country.Should().Be(command.account.Address1.Country);
      entity.Users.Should().HaveCount(1);

      var user = entity.Users.First();
      user.Id.Should().Be(usersCount + 1);
      user.Name.Should().Be(command.account.Name);
      user.Email.Should().Be(command.account.Email);
      user.AccountId.Should().Be(entity.Id);
      user.Account.Should().Be(entity);
    }
  }
}

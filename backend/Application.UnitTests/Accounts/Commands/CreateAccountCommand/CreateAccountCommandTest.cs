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
    public async Task Handle_ShouldPersistAccount()
    {
      var command = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test@test.dk",
          Password = "pa$$w0rd",
          Name = "test name",
          Tel = "12345678",
          Address = new AddressDto
          {
            AddressLine1 = "test street 5",
            AddressLine2 = "1234 test city"
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
      entity.Address.Should().NotBeNull();
      entity.Address.Id.Should().Be(addressCount + 1);
      entity.Address.Account.Should().Be(entity);
      entity.Address.AccountId.Should().Be(entity.Id);
      entity.Address.AddressLine1.Should().Be(command.account.Address.AddressLine1);
      entity.Address.AddressLine2.Should().Be(command.account.Address.AddressLine2);
      entity.Users.Should().HaveCount(1);

      var user = entity.Users.First();
      user.Id.Should().Be(usersCount + 1);
      user.Name.Should().Be(command.account.Name);
      user.Email.Should().Be(command.account.Email);
      user.AccountId.Should().Be(entity.Id);
      user.Account.Should().Be(entity);
      user.Password.Should().Be(command.account.Password);
    }
  }
}

using System.Data;
using Application.Accounts.Commands.CreateAccountCommand;
using FluentValidation;

namespace Application.ExampleChildren.Commands.CreateExampleChild
{
  public class CreateAccountCommandValidator : AbstractValidator<CreateAccountCommand>
  {
    public CreateAccountCommandValidator()
    {
      RuleFor(e => e.account)
        .NotNull();
      RuleFor(e => e.account.Email)
        .NotNull()
        .EmailAddress();
      RuleFor(e => e.account.Name)
        .NotNull()
        .MaximumLength(200);
      RuleFor(e => e.account.Tel)
        .MinimumLength(8)
        .NotNull();
      RuleFor(e => e.account.Password)
        .MinimumLength(8)
        .NotNull();
      RuleFor(e => e.account.Address)
        .NotNull();
      RuleFor(e => e.account.Address.AddressLine1)
        .NotEmpty();
    }
  }
}

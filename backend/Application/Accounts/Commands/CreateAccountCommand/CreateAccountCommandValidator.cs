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
        .NotNull();
      RuleFor(e => e.account.Password)
        .NotNull();
    }
  }
}

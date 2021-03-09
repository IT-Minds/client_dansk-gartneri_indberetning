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
        .NotEmpty().WithMessage("Your password cannot be empty")
        .MinimumLength(8).WithMessage("Your password length must be at least 8.")
        .Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
        .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.")
        .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.")
        .NotNull();
      RuleFor(e => e.account.Address)
        .NotNull();
      RuleFor(e => e.account.Address.AddressLine1)
        .NotEmpty();
    }
  }
}

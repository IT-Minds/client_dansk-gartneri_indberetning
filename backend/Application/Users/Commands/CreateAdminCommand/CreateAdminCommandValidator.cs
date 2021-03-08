using Application.Accounts.Commands.CreateAdmin;
using FluentValidation;

namespace Application.ExampleChildren.Commands.CreateAdmin
{
  public class CreateAdminCommandValidator : AbstractValidator<CreateAdminCommand>
  {
    public CreateAdminCommandValidator()
    {
      RuleFor(e => e.user)
        .NotNull();
      RuleFor(e => e.user.Email)
        .EmailAddress();
      RuleFor(e => e.user.Password)
        .NotNull();
      RuleFor(e => e.user.Name)
        .NotNull()
        .MaximumLength(200);
    }
  }
}

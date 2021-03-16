using FluentValidation;

namespace Application.Users.Commands.UpdateAccountantCommand
{
  public class UpdateAccountantCommandValidator : AbstractValidator<UpdateAccountantCommand>
  {
    public UpdateAccountantCommandValidator()
    {
      RuleFor(e => e.Accountant)
        .NotNull();
      RuleFor(e => e.Accountant.Email)
        .NotEmpty()
        .EmailAddress();
      RuleFor(e => e.Accountant.Name)
        .NotEmpty()
        .MaximumLength(200);
    }
  }
}

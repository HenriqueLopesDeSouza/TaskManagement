using FluentValidation;
using System.Text.RegularExpressions;
using TaskManagementUser.Application.Commands.CreateUser;

namespace TaskManagementUser.Application.Validators
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommandValidator()
        {
            RuleFor(p => p.Email)
                .EmailAddress()
                .WithMessage("Invalid email address!");

            RuleFor(p => p.Password)
                .Must(ValidPassword)
                .WithMessage("Password must contain at least 8 characters, one number, one uppercase letter, one lowercase letter, and one special character");

            RuleFor(p => p.FullName)
                .NotEmpty()
                .NotNull()
                .WithMessage("Name is required!");
        }

        public bool ValidPassword(string password)
        {
            var regex = new Regex(@"^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$");

            return regex.IsMatch(password);
        }
    }
}

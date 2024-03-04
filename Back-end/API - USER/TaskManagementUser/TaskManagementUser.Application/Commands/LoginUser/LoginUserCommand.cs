using MediatR;
using TaskManagementUser.Application.ViewModels;

namespace TaskManagementUser.Application.Commands.LoginUser
{
    public class LoginUserCommand : IRequest<LoginUserViewModel>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

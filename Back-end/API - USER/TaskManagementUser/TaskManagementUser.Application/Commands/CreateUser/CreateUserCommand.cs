using MediatR;

namespace TaskManagementUser.Application.Commands.CreateUser
{
    public class CreateUserCommand : IRequest<Guid>
    {
        public string FullName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
 
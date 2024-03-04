using MediatR;
using TaskManagementUser.Application.ViewModels;

namespace TaskManagementUser.Application.Queries.GetUser
{
    public class GetUserQuery : IRequest<UserViewModel>
    {
        public GetUserQuery(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; private set; }
    }
}

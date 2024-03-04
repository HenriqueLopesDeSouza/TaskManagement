using MediatR;
using TaskManagementUser.Application.DTOs;

namespace TaskManagementUser.Application.Queries.GetAllUser
{
    public class GetAllUserQuery : IRequest<List<UserDTO>>
    {

    }
}

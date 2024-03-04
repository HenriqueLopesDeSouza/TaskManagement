using MediatR;
using TaskManagementUser.Application.DTOs;
using TaskManagementUser.Core.Entities;
using TaskManagementUser.Infrastructure.Interfaces;

namespace TaskManagementUser.Application.Queries.GetAllUser
{
    public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQuery, List<UserDTO>>
    {
        private readonly IUserRepository _userRepository;
        public GetAllUserQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<UserDTO>> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
        {
            var userList = await _userRepository.GetAllAsync();
            var userDTOList = MapUserListToUserDTOList(userList);
            return userDTOList;
        }

        private List<UserDTO> MapUserListToUserDTOList(IEnumerable<User> userList)
        {
            var userDTOList = new List<UserDTO>();

            foreach (var user in userList)
            {
                var userDTO = new UserDTO
                (
                   user.FullName,
                   user.Email
                );

                userDTOList.Add(userDTO);
            }

            return userDTOList;
        }

    }
}

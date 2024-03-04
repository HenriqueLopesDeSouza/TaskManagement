using MediatR;
using TaskManagementUser.Application.ViewModels;
using TaskManagementUser.Core.Entities;
using TaskManagementUser.Infrastructure.Interfaces;

namespace TaskManagementUser.Application.Commands.UpDateUser
{
    public class UpDateUserCommandHandler : IRequestHandler<UpDateUserCommand, UpdateUserViewModel>
    {
        private readonly IUserRepository _userRepository;

        public UpDateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UpdateUserViewModel> Handle(UpDateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(request.Id);

            if (user == null)
            {
                return null;
            }

            var updateViewModel = new UpdateUserViewModel(request.Id,request.FullName, request.Email, request.Active, request.Role);
    
            await _userRepository.UpdateAsync(MapUpdateUserViewModelToUser(updateViewModel));

            return updateViewModel;
        }

        private  User MapUpdateUserViewModelToUser(UpdateUserViewModel updateUserViewModel)
        {
            return new User
            {
                Id = updateUserViewModel.Id,
                FullName = updateUserViewModel.FullName,
                Email = updateUserViewModel.Email,
                Active = updateUserViewModel.Active,
                Role = updateUserViewModel.Role
            };
        }

    }
}

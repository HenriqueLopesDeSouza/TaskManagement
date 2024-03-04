using TaskManagementUser.Core.Entities;
namespace TaskManagementUser.Infrastructure.Interfaces
{
    public interface IUserRepository
    {
        Task AddAsync(User user);
        Task<List<User>> GetAllAsync();
        Task<User> GetByIdAsync(Guid id);
        Task UpdateAsync(User user);
        Task<User> GetUserByEmailAndPasswordAsync(string email, string passwordHash);
    }
}

using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace TaskManagementUser.Infrastructure.Interfaces
{
    public interface IUserLogRepository
    {
        Task AddLogAsync(EntityEntry entry);
    }
}

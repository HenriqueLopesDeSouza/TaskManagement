using Microsoft.EntityFrameworkCore;
using System.Text;
using TaskManagementUser.Core.Entities.Log;
using TaskManagementUser.Core.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using TaskManagementUser.Infrastructure.Interfaces;

namespace TaskManagementUser.Infrastructure.Persistence.Repositories.Log
{
    public class UserLogRepository : IUserLogRepository
    {
        private readonly UserDbContext _dbContext;

        public UserLogRepository(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddLogAsync(EntityEntry entry)
        {
            var user = entry.Entity as User;
            var operation = GetOperation(entry.State);

            if (user != null)
            {
                var log = CreateLog(user, operation);
                _dbContext.UsersLogs.Add(log);
                await _dbContext.SaveChangesAsync();
            }
        }


        private UserLog CreateLog(User user, string operation)
        {
            return new UserLog
            {
                UserId = user.Id,
                Operation = operation,
                LogDateTime = DateTime.Now,
                ValuesChanges = SerializeChanges(user)
            };
        }

        private string SerializeChanges(User user)
        {
            var entry = _dbContext.Entry(user);

            var sb = new StringBuilder();

            foreach (var property in entry.OriginalValues.Properties)
            {
                var original = entry.OriginalValues[property];
                var current = entry.CurrentValues[property];

                if (!object.Equals(original, current))
                {
                    sb.AppendLine($"{entry.Entity.GetType().Name}.{property.Name}: {original} -> {current}");
                }
            }

            return sb.ToString();
        }

        private string GetOperation(EntityState state)
        {
            switch (state)
            {
                case EntityState.Added:
                    return "Added";
                case EntityState.Modified:
                    return "Modified";
                case EntityState.Deleted:
                    return "Deleted";
                default:
                    return "Unknown";
            }
        }
    }

}

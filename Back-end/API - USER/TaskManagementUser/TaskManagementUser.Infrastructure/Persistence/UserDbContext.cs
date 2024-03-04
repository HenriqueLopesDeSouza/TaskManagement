using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TaskManagementUser.Core.Entities;
using TaskManagementUser.Core.Entities.Log;
using TaskManagementUser.Infrastructure.Interfaces;
using static System.Formats.Asn1.AsnWriter;

namespace TaskManagementUser.Infrastructure.Persistence
{
    public class UserDbContext : DbContext
    {
        private readonly IServiceProvider _serviceProvider;
        public UserDbContext(DbContextOptions<UserDbContext> options, IServiceProvider serviceProvider) : base(options)
        {
            _serviceProvider = serviceProvider;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserLog> UsersLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var entries = ChangeTracker.Entries()
               .Where(entry => entry.State == EntityState.Modified || entry.State == EntityState.Added || entry.State == EntityState.Deleted)
               .ToList();

                foreach (var entry in entries)
                {
                    var userLogRepository = scope.ServiceProvider.GetRequiredService<IUserLogRepository>();
                    await userLogRepository.AddLogAsync(entry);
                }

                return await base.SaveChangesAsync(cancellationToken);
            }

        }
    }
}
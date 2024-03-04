using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TaskManagement.Core.Entidades;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace TaskManagement.Infrastructure.Persistence
{
    public class TaskManagementDbContext : DbContext
    {
        private readonly IServiceProvider _serviceProvider;

        public TaskManagementDbContext(DbContextOptions<TaskManagementDbContext> options, IServiceProvider serviceProvider) : base(options)
        {
            _serviceProvider = serviceProvider;

        }

        public DbSet<Subtask> Subtasks { get; set; }
        public DbSet<Tasks> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
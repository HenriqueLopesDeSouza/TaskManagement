using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application;
using TaskManagement.Core.Entidades;

namespace TaskManagement.Application.Service
{
    public interface ITasksService
    {
        Task<TaskViewModel> CreateTaskAsync(TaskViewModel tasks);
        Task<TaskViewModel> GetTaskByIdAsync(string taskId, string userId);
        Task<IEnumerable<TaskViewModel>> GetAllTasksForUserAsync(string userId);
        Task<TaskViewModel> UpdateSubtaskStatusAsync(string taskId, string subtaskId, string status);
        Task DeleteTaskAsync(string taskId, string userId);
        Task<TaskViewModel> UpdateTaskAsync(TaskViewModel task);


    }
}

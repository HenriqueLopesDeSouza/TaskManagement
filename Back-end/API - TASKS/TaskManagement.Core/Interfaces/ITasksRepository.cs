using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Core.Entidades;

namespace TaskManagement.Core.Interfaces
{
    public interface ITasksRepository
    {
        Task<IEnumerable<Tasks>> GetAllTasksForUserAsync(Guid userId);
        Task CreateTaskAsync(Tasks tasks);
        Task DeleteTaskAsync(Guid taskId, Guid userId);
        Task<IEnumerable<Tasks>> GetAllTasksAsync(Guid userId);
        Task<Tasks> GetTaskByIdAsync(Guid taskId, Guid userId);
        //Task<TasksDocument> UpdateAttachmentsAsync(Guid taskId, List<Attachment> attachmentsToAdd, List<string> attachmentIdsToDelete);
        Task<Tasks> UpdateSubtaskStatusAsync(Guid taskId, Guid subtaskId, string status);
        Task<Tasks> UpdateTaskAsync(Tasks task);
    }
}

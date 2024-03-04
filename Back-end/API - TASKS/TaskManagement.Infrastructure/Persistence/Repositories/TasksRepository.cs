using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Core.Entidades;
using TaskManagement.Core.Interfaces;

namespace TaskManagement.Infrastructure.Persistence.Repositories
{
    public class TasksRepository : ITasksRepository
    {
        private readonly TaskManagementDbContext _dbContext;

        public TasksRepository(TaskManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Tasks>> GetAllTasksForUserAsync(Guid userId)
        {
            return await _dbContext.Tasks
                .Include(t => t.Subtasks)
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<Tasks> GetTaskByIdAsync(Guid taskId, Guid userId)
        {
            return await _dbContext.Tasks
                 .Include(t => t.Subtasks)
                .FirstOrDefaultAsync(t => t.TaskId == taskId && t.UserId == userId);
        }

        public async Task<IEnumerable<Tasks>> GetAllTasksAsync(Guid userId)
        {
            return await _dbContext.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task CreateTaskAsync(Tasks tasks)
        {
            await _dbContext.Tasks.AddAsync(tasks);
            await _dbContext.SaveChangesAsync();
        }


        //public async Task<Tasks> UpdateTaskAsync(Tasks task)
        //{
        //    _dbContext.Entry(task).State = EntityState.Modified;
        //    await _dbContext.SaveChangesAsync();
        //    return task;
        //}

        public async Task<Tasks> UpdateTaskAsync(Tasks updatedTask)
        {
            var existingTask = await _dbContext.Tasks.FindAsync(updatedTask.TaskId);

            if (existingTask == null)
            {
                return null;
            }

            _dbContext.Entry(existingTask).CurrentValues.SetValues(updatedTask);

            // Save the changes to the database
            await _dbContext.SaveChangesAsync();

            return existingTask;
        }



        public async Task DeleteTaskAsync(Guid taskId, Guid userId)
        {
            var taskToDelete = await _dbContext.Tasks.Include(t => t.Subtasks).FirstOrDefaultAsync(t => t.TaskId == taskId && t.UserId == userId);
            if (taskToDelete != null)
            {
                _dbContext.Tasks.Remove(taskToDelete);
                await _dbContext.SaveChangesAsync();
            }
        }


        public async Task<Tasks> UpdateSubtaskStatusAsync(Guid taskId, Guid subtaskId, string status)
        {
            var taskToUpdate = await _dbContext.Tasks.Include(t => t.Subtasks).FirstOrDefaultAsync(t => t.TaskId == taskId);
            if (taskToUpdate.Subtasks != null)
            {
                var subtaskToUpdate = taskToUpdate.Subtasks.FirstOrDefault(s => s.SubtaskId == subtaskId);
                if (subtaskToUpdate != null)
                {
                    subtaskToUpdate.Status = status;
                    await _dbContext.SaveChangesAsync();
                }
            }
            return taskToUpdate;
        }

        //public async Task<Tasks> UpdateAttachmentsAsync(string taskId, List<Attachment> attachmentsToAdd, List<string> attachmentIdsToDelete)
        //{
        //    var query = _dbContext.GetItemLinqQueryable<Tasks>()
        //        .Where(t => t.Id == taskId)
        //        .Take(1)
        //        .ToFeedIterator();

        //    var response = await query.ReadNextAsync();
        //    var task = response.FirstOrDefault();

        //    if (task == null)
        //    {
        //        return null;
        //    }

        //    // Add new attachments
        //    if (attachmentsToAdd != null)
        //    {
        //        task.Attachments.AddRange(attachmentsToAdd);
        //    }

        //    // Delete attachments
        //    if (attachmentIdsToDelete != null)
        //    {
        //        task.Attachments.RemoveAll(a => attachmentIdsToDelete.Contains(a.Id));
        //    }

        //    await _dbContext.ReplaceItemAsync(task, task.Id);

        //    return task;
        //}
    }
}

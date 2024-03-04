using System.Collections.Concurrent;
using TaskManagement.Core.Entidades;
using TaskManagement.Core.Interfaces;

namespace TaskManagement.Application.Service
{
    public class TasksService : ITasksService
    {
        private readonly ITasksRepository _tasksRepository;

        public TasksService(ITasksRepository tasksRepository)
        {
            _tasksRepository = tasksRepository;
        }

        public async Task<TaskViewModel> UpdateTaskAsync(TaskViewModel task)
        {
            var response = await _tasksRepository.UpdateTaskAsync(MapToTasks(task));
            return MapToTasks(response);
        }

        public async Task<TaskViewModel> GetTaskByIdAsync(string taskId, string userId)
        {
            return MapToTasks(await _tasksRepository.GetTaskByIdAsync(Guid.Parse(taskId), Guid.Parse(userId)));
        }

        public async Task<IEnumerable<TaskViewModel>> GetAllTasksForUserAsync(string userId)
        {
            return await MapToTasksAsync(_tasksRepository.GetAllTasksForUserAsync(Guid.Parse(userId)));
        }

        public async Task<TaskViewModel> CreateTaskAsync(TaskViewModel tasks)
        {
             await _tasksRepository.CreateTaskAsync(MapToTasks(tasks));
            return tasks;
        }
        public async Task<TaskViewModel> UpdateSubtaskStatusAsync(string taskId, string subtaskId, string status)
        {
            var updatedTask = await _tasksRepository.UpdateSubtaskStatusAsync(Guid.Parse(taskId), Guid.Parse(subtaskId), status);

            if (updatedTask.Subtasks != null)
            {
                return MapToTasks(updatedTask);
            }
            else
            {
                return null;
            }
        }

        public async Task DeleteTaskAsync(string taskId, string userId)
        {
            await _tasksRepository.DeleteTaskAsync(Guid.Parse(taskId), Guid.Parse(userId));
        }

        private TaskViewModel MapToTasks(Tasks createTask)
        {
            return new TaskViewModel
            {
                TaskId = createTask.TaskId.ToString(),
                UserId = createTask.UserId.ToString(),
                Title = createTask.Title,
                Description = createTask.Description,
                DueDate = createTask.DueDate.ToString(),
                Status = createTask.Status,
                Priority = createTask.Priority,
                Subtasks = createTask.Subtasks ?? null
            };
        }

        private async Task<IEnumerable<TaskViewModel>> MapToTasksAsync(Task<IEnumerable<Tasks>> tasksTask)
        {
            var tasksList = await tasksTask;

            var mappedTasks = tasksList.Select(task => new TaskViewModel
            {
                TaskId = task.TaskId.ToString(),
                UserId = task.UserId.ToString(),
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate.ToString(),
                Status = task.Status,
                Priority = task.Priority,
                Subtasks = task.Subtasks ?? null
            });

            return mappedTasks;
        }


        private Tasks MapToTasks(TaskViewModel createTask)
        {
            return new Tasks
            {
                TaskId = Guid.Parse(createTask.TaskId),
                UserId = Guid.Parse(createTask.UserId),
                Title = createTask.Title,
                Description = createTask.Description,
                DueDate = DateTime.Parse(createTask.DueDate),
                Status = createTask.Status,
                Priority = createTask.Priority,
                Subtasks = createTask.Subtasks ?? null
            };
        }

    }
}

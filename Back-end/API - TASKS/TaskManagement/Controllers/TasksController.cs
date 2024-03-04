using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Application;
using TaskManagement.Application.Service;
using TaskManagement.Application.ViewModel;

namespace TaskManagement.Api.Controllers
{
    [Route("api/tasks")]
    public class TasksController : Controller
    {
        private readonly ITasksService _tasksService;

        public TasksController(ITasksService tasksService)
        {
            _tasksService = tasksService;
        }


        [HttpGet("GetTask/{taskId}/{userId}")]
        public async Task<ActionResult<TaskViewModel>> GetTask(string taskId, string userId)
        {
            var task = await _tasksService.GetTaskByIdAsync(taskId, userId);
            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        [HttpPut("{taskId}/subtasks/{subtaskId}/status")]
        public async Task<ActionResult<TaskViewModel>> UpdateSubtaskStatus(string taskId, string subtaskId,
           [FromBody] SubtaskViewModel request)
        {
            var updatedTask = await _tasksService.UpdateSubtaskStatusAsync(taskId, subtaskId, request.Status);
            if (updatedTask == null)
            {
                return NotFound();
            }

            return Ok(updatedTask);
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(string taskId, [FromQuery] string userId)
        {
            var existingTask = await _tasksService.GetTaskByIdAsync(taskId, userId);
            if (existingTask == null)
            {
                return NotFound();
            }

            await _tasksService.DeleteTaskAsync(taskId, userId);
            return NoContent();
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<TaskViewModel>>> GetAllTasksForUser(string userId)
        {
            var tasks = await _tasksService.GetAllTasksForUserAsync(userId);
            if (tasks == null)
            {
                return NotFound();
            }

            return Ok(tasks);
        }


        [HttpPost("CreateTaskAsync")]
        public async Task<IActionResult> CreateTaskAsync([FromBody] TaskViewModel task )
        {

            try
            {
                task.TaskId = Guid.NewGuid().ToString();
                task.UserId = task.UserId;
                task.Subtasks.ForEach(s =>
                {
                    if (s.SubtaskId == null)
                    {
                        s.SubtaskId = Guid.NewGuid();
                    }
                });
                var createdTask = await _tasksService.CreateTaskAsync(task);
                return CreatedAtAction(nameof(GetTask), new { taskId = createdTask.TaskId, userId = createdTask.UserId }, createdTask);

            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while creating the task.", ex);
            }
        }



        [HttpPut("UpdateTask/{taskId}/")]
        public async Task<ActionResult<TaskViewModel>> UpdateTask(string taskId, [FromBody] TaskViewModel? task = null)
        {
            try
            {
                var updatedTask = await _tasksService.UpdateTaskAsync(task);
                if (updatedTask == null)
                {
                    return NotFound(); 
                }
                return Ok(updatedTask);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the task. Please try again later."); 
            }
        }


    }
}

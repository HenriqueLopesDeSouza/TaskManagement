using Newtonsoft.Json;
using TaskManagement.Core.Entidades;

namespace TaskManagement.Application
{
    public class TaskViewModel
    {

        [JsonProperty("id")]
        public string? TaskId { get; set; }

        [JsonProperty("userId")]
        public string? UserId { get; set; }

        [JsonProperty("title")]
        public string? Title { get; set; }

        [JsonProperty("description")]
        public string? Description { get; set; }

        [JsonProperty("dueDate")]
        public string? DueDate { get; set; }

        [JsonProperty("status")]
        public string? Status { get; set; }

        [JsonProperty("priority")]
        public string? Priority { get; set; }

        [JsonProperty("subtasks")]
        public List<Subtask>? Subtasks { get; set; }
    }
}
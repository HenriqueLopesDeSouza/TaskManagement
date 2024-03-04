using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mail;

namespace TaskManagement.Core.Entidades
{
    public class Tasks
    {
        [Key]
        public Guid TaskId { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public List<Subtask> Subtasks { get; set; }
    }
}
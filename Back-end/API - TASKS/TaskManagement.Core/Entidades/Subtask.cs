using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Core.Entidades
{
    public class Subtask
    {
        [Key]
        public Guid SubtaskId { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }

    }
}

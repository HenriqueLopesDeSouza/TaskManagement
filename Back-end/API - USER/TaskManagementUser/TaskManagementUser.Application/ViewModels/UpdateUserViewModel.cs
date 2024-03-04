using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementUser.Application.ViewModels
{
    public class UpdateUserViewModel 
    {
        public UpdateUserViewModel(Guid id,string fullName, string email, bool active, string role)
        {
            Id = id;
            FullName = fullName;
            Email = email;
            Active = active;
            Role = role;
        }
        public Guid Id { get; set; }
        public string FullName { get; private set; }
        public string Email { get; private set; }
        public bool Active { get; set; }
        public string Role { get; private set; }
    }
}


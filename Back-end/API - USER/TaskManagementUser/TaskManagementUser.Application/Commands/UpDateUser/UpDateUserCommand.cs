using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagementUser.Application.ViewModels;

namespace TaskManagementUser.Application.Commands.UpDateUser
{
    public class UpDateUserCommand : IRequest<UpdateUserViewModel>
    {
        public Guid Id { get;  set; }
        public string FullName { get;  set; }
        public string Email { get;  set; }
        public bool Active { get; set; }
        public string Role { get;  set; }
    }
}

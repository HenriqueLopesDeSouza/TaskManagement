using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementUser.Application.Commands.CreateUser;
using TaskManagementUser.Application.Commands.LoginUser;
using TaskManagementUser.Application.Commands.UpDateUser;
using TaskManagementUser.Application.Queries.GetAllUser;
using TaskManagementUser.Application.Queries.GetUser;

namespace TaskManagementUser.Controllers
{
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var query = new GetAllUserQuery();

            var skills = await _mediator.Send(query);

            return Ok(skills);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var query = new GetUserQuery(id);

            var user = await _mediator.Send(query);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // api/users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateUserCommand command)
        {
            try
            {
                var id = await _mediator.Send(command);

                return CreatedAtAction(nameof(GetById), new { id = id }, command);
            }
            catch (Exception ex)
            {
                return StatusCode(409, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpDateUserCommand command)
        {
            try
            {
                var update = await _mediator.Send(command);

                if (update == null)
                {
                    return BadRequest();
                }

                return Ok(update);
            }
            catch (Exception ex)
            {
                return StatusCode(409, ex.Message);
            }
        }

        [HttpPut("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginUserCommand command)
        {
            var loginUserviewModel = await _mediator.Send(command);

            if (loginUserviewModel == null)
            {
                return BadRequest("User not found or invalid credentials.");
            }

            return Ok(loginUserviewModel);
        }
    }
}

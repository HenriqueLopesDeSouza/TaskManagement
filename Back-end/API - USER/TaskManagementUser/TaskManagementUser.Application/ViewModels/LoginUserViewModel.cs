namespace TaskManagementUser.Application.ViewModels
{
    public class LoginUserViewModel
    {
        public LoginUserViewModel(string email, string token, string role, Guid id)
        {
            Email = email;
            Token = token;
            Role = role;
            Id = id;
        }

        public string Email { get; private set; }
        public string Token { get; private set; }
        public string Role { get; private set; }
        public Guid Id { get; set; }

    }
}

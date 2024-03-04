namespace TaskManagementUser.Core.Entities
{
    public class User
    {
        public User() { }
        public User(string fullName, string email, string passwordHash, string role)
        {
            FullName = fullName;
            Email = email;
            CreatedAt = DateTime.Now;
            Active = true;
            PasswordHash = passwordHash;
            Role = role;
        }

        public Guid Id { get;  set; }
        public string FullName { get;  set; }
        public string Email { get;  set; }
        public DateTime CreatedAt { get;  set; }
        public bool Active { get; set; }
        public string PasswordHash { get;  set; }
        public string Role { get;  set; }
    }
}
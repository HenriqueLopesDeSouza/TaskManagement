namespace TaskManagementUser.Core.Entities
{
    public  interface IAuthService
    {
        string ComputeSha256Hash(string password);
        public string GenerateJwtToken(string email, string role);
    }
}

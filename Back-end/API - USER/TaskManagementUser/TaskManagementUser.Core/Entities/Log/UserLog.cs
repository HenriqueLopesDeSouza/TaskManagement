namespace TaskManagementUser.Core.Entities.Log
{
    public class UserLog
    {
        public Guid? UserLogId { get; set; }
        public Guid? UserId { get; set; }
        public string Operation { get; set; }
        public DateTime LogDateTime { get; set; }
        public string ValuesChanges { get; set; }
    }
}

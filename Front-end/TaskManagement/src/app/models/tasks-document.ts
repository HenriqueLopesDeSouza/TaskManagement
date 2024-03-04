export interface TasksDocument {
    id: string;
    taskId: string;
    userId: string;
    title: string;
    description: string;
    dueDate: string; // Change the type to string for date inputs
    status: string;
    priority: string;
    subtasks: Subtask[];
  }
  
export interface CreateTaskViewModel {
  TaskId:string;
  userId: string;
  title: string;
  Description: string;
  DueDate: string;
  Status: string;
  Priority: string;
}

  export interface Attachment {
    id: string;
    fileName: string;
    url: string;
  }
  
  export interface Subtask {
    id: string;
    subtaskId:string;
    title: string;
    status: string;
  }
  
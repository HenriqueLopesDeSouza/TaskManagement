import { Component, OnInit } from '@angular/core';
import { Subtask, TasksDocument } from '../../models/tasks-document';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TaskViewComponent implements OnInit {

  IdUser = "";
  tasks: TasksDocument[] = [];
  constructor(private taskService: TaskService, private toastrService: ToastrService,
    private router: Router,private storageService: StorageService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getStatusTextColor(status: string): string[] {
    switch (status) {
      case 'Pending':
        return ['btn text-pending'];
      case 'In Progress':
        return ['btn text-in-progress'];
      case 'Completed':
      case 'Done':
        return ['btn btn-success'];
      default:
        return ['']; // Return an empty string for other cases or handle them accordingly
    }
  }

  updateSubtaskStatus(subtask: Subtask, taskId: string) {
    this.taskService.UpdateSubTaskStatus(subtask.status, taskId, subtask.subtaskId).subscribe({
      next: value => {
        this.toastrService.success('Success', 'Sub Task Updated');
      }, complete: () => { },
      error: error => {
        console.error(error);
      }
    });
  }

  getTasks() {
    this.IdUser = this.storageService.getUser().id;
    this.taskService.GetTasks(this.IdUser).subscribe(s => {
      this.tasks = s;
    })
  }

  goToUpdateTask(taskId: string) {
    this.router.navigate(['/tasks-edit', taskId]);
  }

  deleteTask(taskId:string){
    this.IdUser = this.storageService.getUser().id;

    this.taskService.DeleteTask(this.IdUser , taskId).subscribe({
      next: value => {
        this.toastrService.success('Success', 'Task deleted');
        this.getTasks();
      }, complete: () => { },
      error: error => {
        console.error(error);
      }
    });
  }

  getPriorityTasksCount(priority: string) {
    return this.tasks.filter(f => f.priority === priority).length || 0;
  }

  getDateFormated(dateString: string): string {
    const [date, time ] = dateString.split(' ');
    const [day ,month, year,] = date.split('/');

    const dateFormat = `${day}/${month}/${year}`;
    return dateFormat;
}

  convertToISODate(dateString: string): string {
    const [date, time ] = dateString.split(' ');
    const [day ,month, year,] = date.split('/');
    const [hour, minute, second] = time.split(':');

    const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    return isoDateString;
}

  getDueDateStatus(dueDate: string): { status: string; cssClass: string } {
    const today = new Date();
    const dueDateValue = new Date(this.convertToISODate(dueDate));
  
    const timeDiff = dueDateValue.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    if (diffDays < 0) {
      return { status: 'Overdue', cssClass: 'overdue' };
    } else if (diffDays === 0) {
      return { status: 'Due Today', cssClass: 'due-today' };
    } else if (diffDays <= 3) {
      return { status: 'Due Soon', cssClass: 'due-soon' };
    } else {
      return { status: 'Upcoming', cssClass: 'upcoming' };
    }
  }

}

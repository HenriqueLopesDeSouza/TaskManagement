import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subtask, TasksDocument } from '../../models/tasks-document';
import { validateAllFormFields } from '../../services/validate-all-form-fields.service';
import { TaskService } from '../../services/task.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css']
})
export class TasksEditComponent {
  taskId!: string;
  userId = this.storageService.getUser().id;
  taskDocument!: TasksDocument;
  taskForm!: FormGroup;

  constructor(private route: ActivatedRoute, private taskService: TaskService,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private storageService: StorageService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('taskId') || '';
      this.buildForm();
    });
  }

  buildForm() {
    this.taskForm = this.formBuilder.group({
      id: [''],
      taskId: [''],
      userId: [this.userId, Validators.required],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      subtasks: this.formBuilder.array([])
    });
    // Fetch task details using the task ID
    this.getTask();
  }

  getTask() {
    this.taskService.GetTask(this.userId, this.taskId).subscribe(
      {
        next: value => {
          this.taskDocument = value;
          this.patchTaskData();
        }, complete: () => { },
        error: error => {
          if (error.status === 404) {
            this.toastrService.info('No such task found, please select from Task list', 'Incorrect Task');
            this.goToTasks();
          } else {
            console.error(error);
          }
        }
      });
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

  isFieldInvalid(field: string): boolean | undefined {
    const control = this.taskForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }


  patchSubtasks(subtasks: Subtask[]): FormGroup[] {

    const subtaskFormGroups: FormGroup[] = [];
    for (const subtask of subtasks) {
      const subtaskFormGroup = this.formBuilder.group({
        id: [subtask.id],
        title: [subtask.title, Validators.required],
        status: [subtask.status, Validators.required]
      });
      subtaskFormGroups.push(subtaskFormGroup);
    }
    return subtaskFormGroups;
  }

  patchTaskData() {
    this.taskDocument.dueDate = this.convertToISODate(this.taskDocument.dueDate)

    const retrievedTaskData = this.taskDocument;
    // Patch the task data into the form
    this.taskForm.patchValue({
      id: retrievedTaskData.id,
      taskId: retrievedTaskData.taskId,
      userId: retrievedTaskData.userId,
      title: retrievedTaskData.title,
      description: retrievedTaskData.description,
      dueDate: new Date(retrievedTaskData.dueDate).toISOString().substring(0, 10),
      status: retrievedTaskData.status,
      priority: retrievedTaskData.priority
    });

    // Patch subtasks
    const subtaskFormArray = this.taskForm.get('subtasks') as FormArray;
    retrievedTaskData.subtasks.forEach((subtask: Subtask) => {
      subtaskFormArray.push(
        this.formBuilder.group({
          id: subtask.id,
          title: subtask.title,
          status: subtask.status
        })
      );
    });
  }


  getSubtaskStatusControlName(index: number) {
    return `${index}.status`;
  }

  get subtaskControls(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    const subtaskGroup = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.subtaskControls.push(subtaskGroup);
  }

  isSubtaskFieldInvalid(subtaskIndex: number, fieldName: string) {
    const subtaskGroup = this.subtaskControls.at(subtaskIndex) as FormGroup;
    const field = subtaskGroup.get(fieldName) as AbstractControl;
    return field.invalid && (field.dirty || field.touched);
  }


  removeSubtask(index: number): void {
    this.subtaskControls.removeAt(index);
  }
  updateTask() {
    validateAllFormFields(this.taskForm);
    if (this.taskForm.invalid) {
      return;
    }

    this.taskService.UpdateTask(this.taskForm.value).subscribe({
      next: value => {
        this.toastrService.success('Success', 'Task Updated');
        this.goToTasks();
      }, complete: () => {   this.router.navigate(['/tasks-view']);    },
      error: error => {
        if(error.status===400){
        this.toastrService.info('some data is incorrect, please correct and try again', 'Incomplete Task');
        
        } else{
        console.error(error);
        }
      }
    });
  }

  convertToISODate(dateString: string): string {
    const [date, time ] = dateString.split(' ');
    const [day ,month, year,] = date.split('/');

    const isoDateString = `${year}-${month}-${day}`;
    return isoDateString;
}

  getLimitedText(task:TasksDocument | undefined | null) {
    return (task && task.title.length > 25) ? `${task.title.substring(0, 25)}...` : task?.title;
  }
}

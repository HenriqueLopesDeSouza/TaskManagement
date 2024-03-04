
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { validateAllFormFields } from '../../services/validate-all-form-fields.service';
import { TaskService } from '../../services/task.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.css']
})
export class TasksCreateComponent {
  taskForm!: FormGroup;
  userId = this.storageService.getUser().id;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private taskService: TaskService,
    private router: Router,
    private toastrService: ToastrService,private storageService: StorageService) { }

  isFieldInvalid(field: string): boolean | undefined {
    const control = this.taskForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }


  ngOnInit(): void {
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

  createTask(): void {
    validateAllFormFields(this.taskForm);
    if (this.taskForm.invalid) {
      return;
    }
    
    this.taskService.CreateTaskAsync(this.taskForm.value).subscribe({
      next: value => {
        this.toastrService.success('Success','Task Created');
        this.goToTasks();
      }, complete: () => { this.taskForm.reset(); },
      error: error => {
        console.error(error);
        this.toastrService.error('Erro ao criar a tarefa', 'Erro', {
          closeButton: true, // Mostrar botão de fechar
          progressBar: true, // Mostrar barra de progresso
          timeOut: 5000, // Tempo de exibição em milissegundos (5 segundos neste exemplo)
          extendedTimeOut: 2000, // Tempo de exibição estendido se o mouse estiver sobre o toast (2 segundos neste exemplo)
          tapToDismiss: false, // Permitir o fechamento do toast ao clicar nele
          enableHtml: true, // Permitir o uso de HTML no conteúdo do toast
          toastClass: 'toast-error' // Classe CSS adicional para personalizar o estilo do toast
        });

      }
    });

  }

  goToTasks() {
    this.router.navigate(['/tasks-view']);
  }

}

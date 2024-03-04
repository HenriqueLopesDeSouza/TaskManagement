import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { TaskViewComponent } from './tasks-view/tasks-view/tasks-view.component';
import { TasksEditComponent } from './tasks-edit/tasks-edit/tasks-edit.component';
import { TasksCreateComponent } from './tasks-create/tasks-create/tasks-create.component';
import { TrashIconComponent } from './trash-icon/trash-icon/trash-icon.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'tasks-view', component: TaskViewComponent }, 
  { path: 'tasks-create', component: TasksCreateComponent }, 
  { path: 'tasks-edit/:taskId', component: TasksEditComponent }, 
  { path: 'trash-icon', component: TrashIconComponent }, 

  
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { TasksEditComponent } from './tasks-edit/tasks-edit/tasks-edit.component';
import { TasksCreateComponent } from './tasks-create/tasks-create/tasks-create.component';
import { TaskViewComponent } from './tasks-view/tasks-view/tasks-view.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TrashIconComponent } from './trash-icon/trash-icon/trash-icon.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    TaskViewComponent,
    TasksEditComponent,
    TasksCreateComponent,
    TrashIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({}),
    MatTooltipModule
  ],
  providers: [httpInterceptorProviders, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }

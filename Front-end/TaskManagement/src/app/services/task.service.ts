import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TasksDocument, CreateTaskViewModel } from '../models/tasks-document';
import { Observable, map } from 'rxjs';
import { StorageService } from './storage.service';



@Injectable({ providedIn: 'root' })
export class TaskService {
    private apiUrl: string;
    constructor(private http: HttpClient, private storageService: StorageService) {
        this.apiUrl =  'https://localhost:7007/api/tasks';
    }

    CreateTaskAsync(model: CreateTaskViewModel): Observable<any> {
        const url = `${this.apiUrl}/CreateTaskAsync`;
        const httpOptions = this.getHttpOptions();

        return this.http.post(url, model,httpOptions);
    }

    UpdateTask(model: TasksDocument): Observable<any> {
        const url = `${this.apiUrl}/UpdateTask/${model.taskId}`;
        const httpOptions = this.getHttpOptions();

        return this.http.put(url, model,httpOptions);
    }


    ///Tasks/tk/subtasks/dd/status
    UpdateSubTaskStatus(status: string, taskId: string, subtaskId: string): Observable<any> {
        const url = `${this.apiUrl}/${taskId}/subtasks/${subtaskId}/status`;
        const model = { "status": status };
        const httpOptions = this.getHttpOptions();

        return this.http.put(url, model,httpOptions);
    }

    GetTasks(userId: string): Observable<TasksDocument[]> {
        const url = `${this.apiUrl}/user/${userId}`;
        const httpOptions = this.getHttpOptions();


        return this.getArrary<TasksDocument>(url,httpOptions);
    }

    ///Tasks/t1?userId=u1
    GetTask(userId: string, taskId:string): Observable<TasksDocument> {
        const url = `${this.apiUrl}/GetTask/${taskId}/${userId}`;
        const httpOptions = this.getHttpOptions();

        return this.get<TasksDocument>(url,httpOptions);
    }

    DeleteTask(userId: string, taskId:string): Observable<any> {
        const url = `${this.apiUrl}/${taskId}?userId=${userId}`;
        return this.http.delete(url);
    }


    private getHttpOptions(): any {
        const token = this.storageService.getUser().token;
    
        const httpOptions = {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        };
    
        return httpOptions;
      }

    private get<T>(url: string, options?: any): Observable<T> {
        return this.http
            .get(url, options)
            .pipe(map((res) => this.extractData<T>(res))) as Observable<T>;
    }
    private getArrary<T>(url: string, options?: any): Observable<T[]> {
        return this.http
            .get(url, options)
            .pipe(map((res) => this.extractData<T[]>(res))) as Observable<T[]>;
    }

    private extractData<T>(res: any) {
        if (res && (res.status < 200 || res.status >= 300)) {
            throw new Error('Bad response status: ' + res.status);
        }
        return (res || {}) as T;
    }
}
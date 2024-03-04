import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_AUTH= 'https://localhost:7274/api/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.put(`${API_AUTH}/login`, body, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    const body = {
      fullName: username,
      email: email,
      password: password,
      role:'user'};

    return this.http.post(`${API_AUTH}`, body, httpOptions);
  }

}

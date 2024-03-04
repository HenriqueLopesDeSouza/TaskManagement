import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  email = '';
  roles: string[] = [];

  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private authService: AuthService, 
    private storageService: StorageService,
    private router: Router,
    private AppComponent: AppComponent
    ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.email = this.storageService.getUser().email;

        this.AppComponent.isLoggedIn = true;
        this.loginSuccess.emit();
      },
      error: err => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}

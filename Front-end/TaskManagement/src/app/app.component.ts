import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  email?: string;
  title = 'Task Management';

  constructor(private storageService: StorageService, private authService: AuthService,  private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.email = user.email;
    
    }
  }

  logout(): void {
    this.storageService.clean();
    console.log('Logout bem-sucedido');
    window.location.reload();
  }

  onLoginSuccess(): void {
    // Recarregando o componente AppComponent
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //   // this.router.navigate(['/tasks-view']);
    // });
  }

}

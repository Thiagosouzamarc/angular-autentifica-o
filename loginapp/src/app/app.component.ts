import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './auth/user.service';
import { User } from './auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  authenticated$ : Observable<boolean>;
  user$ : Observable<User>;

  constructor(
    private router: Router,
    private authService: UserService)  {
      this.authenticated$ = this.authService.isAuthenticated();
      this.user$ = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}

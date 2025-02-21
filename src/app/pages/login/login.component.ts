import { Component, inject } from '@angular/core';
import { LoginUsersComponent } from './login-users/login-users.component';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  imports: [LoginUsersComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})


export class LoginComponent {
  usersService = inject(UsersService)
  router = inject(Router)

  ngOnInit() {

    if (this.usersService.isLogged()) {
      this.router.navigateByUrl('/home')
    } else {
      this.router.navigateByUrl('/login')
    }
  }
}

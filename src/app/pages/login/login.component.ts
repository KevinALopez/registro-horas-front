import { Component } from '@angular/core';
import { LoginUsersComponent } from './login-users/login-users.component';

@Component({
  selector: 'app-login',
  imports: [LoginUsersComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-users',
  imports: [ReactiveFormsModule],
  templateUrl: './login-users.component.html',
  styleUrl: './login-users.component.css'
})
export class LoginUsersComponent {
  loginForm: FormGroup


  constructor() {
    this.loginForm = new FormGroup({
      usarname: new FormControl("", []),
      password: new FormControl("", [])
    }, [])
  }
  async getLogin() {

  }
}
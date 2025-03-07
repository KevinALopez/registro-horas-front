import { UsersService } from './../../../services/users.service';
import Swal from 'sweetalert2';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-login-users',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './login-users.component.html',
  styleUrl: './login-users.component.css',
})
export class LoginUsersComponent {
  loginForm: FormGroup;
  UsersService = inject(UsersService);
  router = inject(Router);
  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  async onSubmit() {
    try {
      const response = await this.UsersService.login(this.loginForm.value);
      await Swal.fire('login', 'login Correcto', 'success');
      localStorage.setItem('store_token', response.token!);
      this.router.navigateByUrl('/home');
    } catch (error) {
      Swal.fire('login', 'Usuario y/o Contrasena incorrecta', 'error');
    }
  }
}

import { Component, inject, Input } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-password',
  imports: [ ReactiveFormsModule],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {
  passwordForm: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);
  @Input() userId: string = '';

  constructor() {
    this.passwordForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit() {

  }

  async onSubmit() {
    /*try {
      const userId = (this.userId);
      console.log(userId, 'userId en el onSubmit');
      const password = await this.usersService.changePassword(userId, this.passwordForm.value.currentPassword, this.passwordForm.value.newPassword);
      console.log(password, 'password actual en el onSubmit');
      const {username} = password!;
      this.passwordForm.patchValue({username});
      console.log(this.passwordForm.value, 'password actualizada en el onSubmit');
      Swal.fire('Contraseña actualizada exitosamente', 'Gracias por tu trabajo', 'success');
      this.router.navigateByUrl('/login');
    }
    catch (error) {
      Swal.fire('Error al actualizar la contraseña', 'Por favor, intenta nuevamente', 'error');
    }*/
  }

}

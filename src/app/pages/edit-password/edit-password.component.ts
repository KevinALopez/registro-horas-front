import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '../../guards/admin.guard';

@Component({
  selector: 'app-edit-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css',
})
export class EditPasswordComponent {
  passwordForm: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);
  userId: number = 21;

  constructor() {
    console.log('Constructor iniciado');
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      username: new FormControl('', [Validators.required]),
    });
    console.log('Formulario creado:', this.passwordForm);
  }

  ngOnInit() {
    console.log('ngOnInit iniciado');
    // Obtener el ID del usuario del token
    const token = localStorage.getItem('store_token');
    console.log('Token obtenido:', token);

    if (token) {
      const payload = jwtDecode<CustomPayload>(token);
      console.log('Payload decodificado:', payload);

      // Obtener el ID del usuario desde el servicio usando el username del token
      this.usersService
        .getById(payload.id)
        .then((user) => {
          if (user?.id) {
            this.userId = user.id;
            this.passwordForm.get('username')?.setValue(user.username); // Asignar el username al formulario
            console.log('ID del usuario establecido:', this.userId);
          } else {
            console.log('No se encontró el ID del usuario');
          }
        })
        .catch((error) => {
          console.error('Error al obtener usuarios:', error);
        });
    } else {
      console.log('No hay token disponible');
    }
  }

  async onSubmit() {
    console.log('onSubmit iniciado');
    console.log('Estado del formulario:', {
      valid: this.passwordForm.valid,
      value: this.passwordForm.value,
    });

    if (this.passwordForm.valid) {
      try {
        console.log('Intentando cambiar contraseña:', this.passwordForm.value);

        const result = await this.usersService.changePassword(
          this.passwordForm.value.currentPassword,
          this.passwordForm.value.newPassword
        );

        console.log('Respuesta del servidor:', result);
        await Swal.fire(
          'Éxito',
          'Contraseña actualizada exitosamente',
          'success'
        );
        console.log('Redirigiendo a /home');
        this.router.navigateByUrl('/home');
      } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        Swal.fire(
          'Error',
          'Error al actualizar la contraseña. Verifica que la contraseña actual sea correcta',
          'error'
        );
      }
    } else {
      console.log('Formulario inválido:', {
        formValid: this.passwordForm.valid,
        formErrors: this.passwordForm.errors,
      });
    }
  }
}

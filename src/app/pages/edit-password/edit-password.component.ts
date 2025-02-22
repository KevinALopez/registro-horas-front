import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '../../guards/admin.guard';

@Component({
  selector: 'app-edit-password',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
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
        Validators.minLength(6)
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
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
      this.usersService.getAll().then(users => {
        console.log('Lista de usuarios obtenida:', users);
        const currentUser = users.find(user => user.username === payload.username);
        console.log('Usuario actual encontrado:', currentUser);

        if (currentUser?.id) {
          this.userId = currentUser.id;
          this.passwordForm.patchValue({ username: currentUser.username }); // Asignar el username al formulario
          console.log('ID del usuario establecido:', this.userId);
        } else {
          console.log('No se encontró el ID del usuario');
        }
      }).catch(error => {
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
      userId: this.userId
    });

    if (this.passwordForm.valid && this.userId) {
      try {
        console.log('Intentando cambiar contraseña para usuario:', {
          userId: this.userId,
          currentPassword: this.passwordForm.value.currentPassword,
          newPassword: this.passwordForm.value.newPassword
        });

        const result = await this.usersService.changePassword(
          this.userId,
          this.passwordForm.value.currentPassword,
          this.passwordForm.value.newPassword
        );

        console.log('Respuesta del servidor:', result);
        await Swal.fire('Éxito', 'Contraseña actualizada exitosamente', 'success');
        console.log('Redirigiendo a /home');
        this.router.navigateByUrl('/home');
      } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        Swal.fire('Error', 'Error al actualizar la contraseña. Verifica que la contraseña actual sea correcta', 'error');
      }
    } else {
      console.log('Formulario inválido o userId no disponible:', {
        formValid: this.passwordForm.valid,
        userId: this.userId,
        formErrors: this.passwordForm.errors
      });
    }
  }
}

import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import Swal from 'sweetalert2';
import { User } from './../../interfaces/user.interface';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  router = inject(Router) /* kevin B */
  isModalOpen = false;
  private http = inject(HttpClient);
  private usersService = inject(UsersService);

  loggedUser: User | null = null;

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    ])
  });

  constructor() {
    console.log('Iniciando HeaderComponent');

    this.usersService.loggedUser$.subscribe(user => {
      console.log('Usuario actualizado:', user);
      this.loggedUser = user;
    });

    const currentUser = this.usersService.getLoggedUser();
    console.log('Usuario inicial:', currentUser);
    if (currentUser) {
      this.loggedUser = currentUser;
      console.log('Username:', this.loggedUser.username);
    }
  }

  // Método para debugging
  ngOnInit() {
    console.log('Estado actual del usuario:', this.loggedUser);
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    if (this.isModalOpen) {
      document.body.style.overflow = 'hidden'; // Previene el scroll del body
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
    this.passwordForm.reset();
  }

  async updatePassword() {
    try {
      if (this.passwordForm.invalid) {
        throw new Error('VALIDATION_ERROR');
      }

      const currentPassword = this.passwordForm.get('currentPassword')?.value;
      const newPassword = this.passwordForm.get('newPassword')?.value;
      const userId = this.loggedUser?.id;

      if (!userId || !currentPassword || !newPassword) {
        throw new Error('AUTH_ERROR');
      }

      await this.usersService.updatePassword(userId, {
        currentPassword,
        newPassword
      });

      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La contraseña ha sido actualizada correctamente.'
      });

      this.closeModal();

    } catch (error: any) {
      let errorMessage = 'Ocurrió un error al actualizar la contraseña.';

      if (error.message === 'VALIDATION_ERROR') {
        errorMessage = 'Por favor verifica los campos del formulario. La contraseña debe tener al menos 8 caracteres, incluir una letra, un número y un carácter especial.';
      } else if (error.message === 'AUTH_ERROR') {
        errorMessage = 'Debes estar logueado para cambiar la contraseña.';
      } else if (error.status === 401) {
        errorMessage = 'La contraseña actual es incorrecta.';
      } else if (error.status === 400) {
        errorMessage = 'La nueva contraseña no cumple con los requisitos de seguridad.';
      }

      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
    }
  }

  /*   async logout() {
      try {
        await this.usersService.logout();
        window.location.href = '/login';
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cerrar sesión'
        }); */
  /* }
    } */

  logout() {  /* kevinb */
    localStorage.removeItem('store_token')
    this.router.navigate(['/login'])
  }
}


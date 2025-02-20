import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isModalOpen = false;
  private http = inject(HttpClient);
  private usersService = inject(UsersService);

  loggedUser: any;

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[@$!%*?&]).{8,}$/) // Mínimo 8 caracteres + 1 especial
    ])
  });

  constructor() {
    // 🔹 Suscribirse al usuario autenticado
    /* this.usersService.loggedUser$.subscribe(user => {
       this.loggedUser = user;
     });*/

    // 🔹 Obtener el usuario si ya estaba logueado antes
    /* this.loggedUser = this.usersService.getLoggedUser();*/
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

  updatePassword() {
    if (this.passwordForm.invalid) {
      alert("Por favor, complete correctamente los campos.");
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.value;
    const userId = this.loggedUser?.id;

    if (!userId || !currentPassword || !newPassword) {
      Swal.fire("Error", "Ocurrió un error al actualizar la contraseña.", "error");
      return;
    }

    // Usando el método existente updateById
    this.usersService.updateById(userId, {
      ...this.loggedUser,
      password: newPassword
    })
      .then(() => {
        Swal.fire("Contraseña actualizada", "La contraseña ha sido actualizada correctamente.", "success");
        this.closeModal();
      })
      .catch((error: any) => {
        if (error.status === 401) {
          Swal.fire("Error", "La contraseña actual no coincide.", "error");
        } else {
          Swal.fire("Error", "Ocurrió un error al actualizar la contraseña.", "error");
        }
      });
  }

  logout() {
    // Usando lastValueFrom para manejar la respuesta del Observable
    this.usersService.login({ username: '', password: '' }) // Llamada inválida para forzar logout
      .then(() => {
        console.log("Cerrando sesión...");
        // Aquí puedes agregar la redirección o limpiar el estado
        window.location.href = '/login'; // o usar Router para navegar
      })
      .catch(() => {
        console.log("Sesión cerrada exitosamente");
        // La llamada fallará pero eso es lo que queremos para cerrar sesión
      });
  }
}


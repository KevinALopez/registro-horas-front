import { UsersService } from './../../services/users.service';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule],
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
  }

  closeModal() {
    this.isModalOpen = false;
    this.passwordForm.reset();
  }

  updatePassword() {
    if (this.passwordForm.invalid) {
      alert("Por favor, complete correctamente los campos.");
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.value;
    const userId = this.loggedUser?.id;

    if (!userId) {
      alert("Error: Usuario no identificado.");
      return;
    }

    // 🔹 Se llama a `updatePassword` desde `UsersService`
    /*this.usersService.updatePassword(userId, currentPassword, newPassword)
      .then(() => {
        alert('Contraseña actualizada correctamente.');
        this.closeModal();
      })
      .catch(error => {
        if (error.status === 401) {
          alert("Contraseña actual incorrecta.");
        } else {
          alert("Error al actualizar la contraseña. Intente de nuevo.");
        }
      });
  }*/

    /*this.usersService.logout();*/
    console.log("Cerrando sesión...");
  }

  logout() {
    console.log("Cerrando sesión...");
  }
}

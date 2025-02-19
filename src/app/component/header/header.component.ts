import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isModalOpen = false;
  http = inject(HttpClient);

  loggedUser: any;

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[@$!%*?&]).{8,}$/)
    ])
  });

  constructor() {
    /*this.userService.loggedUser.subscribe((user: any) => {
       this.loggedUser = user;
     });*/
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updatePassword() {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword } = this.passwordForm.value;
    const userId = this.loggedUser?.id;

    /*this.http.put(`${environment.apiUrl}/users/${userId}/password`, {
      userId,
      currentPassword,
      newPassword // **Corrección: agregar el campo `newPassword` en la petición**
    }).subscribe({
      next: () => {
        alert('Contraseña actualizada correctamente');
        this.passwordForm.reset();
        this.closeModal();
      },
      error: () => {
        alert('Error al actualizar la contraseña');
      }
    });
  }*/

    /*logout() {
      console.log("Cerrando sesión...");
    };*/
  }

}

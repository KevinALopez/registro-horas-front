import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  passwordForm:  FormGroup;
  isModalOpen = false;
usersService = inject(UsersService)
router = inject(Router)
@Input() userId: number | undefined;
loggedUser: any;


constructor() {
  this.passwordForm = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6) // Mínimo 6 caracteres
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6), // Mínimo 6 caracteres
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/) // Al menos una mayúscula y un número
    ])
  });
}

  async ngOnInit() {
    if (this.userId) {
      const user = await this.usersService.getById(this.userId);
      const { password } = user!;
      this.passwordForm.setValue({ password });
    }
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async updatePassword() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      try {
        await this.usersService.updatePassword(currentPassword, newPassword);
        this.closeModal();
        Swal.fire('Contraseña actualizada', 'La contraseña se ha actualizado correctamente', 'success');
      } catch (error) {
        console.error('Error al actualizar la contraseña', error);
        Swal.fire('Error', 'Ocurrió un error al actualizar la contraseña', 'error');
      }
    }
  }

  async logout() {
    try {
      await this.usersService.logout();
      Swal.fire('Cierre de sesión', 'Sesión cerrada correctamente', 'success');
      this.router.navigateByUrl('/login');
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al cerrar sesión', 'error');
    }
  }
}




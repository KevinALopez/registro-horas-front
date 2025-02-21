import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

interface PasswordResponse {
  message: string;
  status: number;
}

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {
  formData = {
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    role: '',
    contract: ''
  };

  private usersService = inject(UsersService);
  private router = inject(Router);

  constructor() {}

  async onSubmit(): Promise<void> {
    try {
      const response = await this.usersService.changePassword(
        this.formData.username,
        this.formData.currentPassword,
        this.formData.newPassword
      );

      Swal.fire('Contraseña actualizada exitosamente', 'Gracias por tu trabajo', 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      if (error?.status === 401) {
        Swal.fire('Usuario o contraseña actual incorrectos', 'Por favor, verifica tus credenciales', 'error');
      } else {
        Swal.fire('Error al actualizar la contraseña', 'Por favor, intenta nuevamente', 'error');
      }
    }
  }
}

import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  editUserForm: FormGroup;
  userService = inject(UsersService);
  router = inject(Router);
  @Input() userId: string | null = null;

  constructor() {
    this.editUserForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_-]+$/), // Solo letras, números, guion y guion bajo
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), // Validación estricta de email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/), // Al menos una mayúscula y un número
      ]),
      role: new FormControl('', [Validators.required]),
      contract: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/), // Solo números positivos (del 1 en adelante)
      ]),
    });
  }

  async ngOnInit(): Promise<void> {
    const user = await this.userService.getById(Number(this.userId));
    const { username, email, password, role, contract } = user!;
    this.editUserForm.setValue({ username, email, password, role, contract });
  }
  async onSubmit(): Promise<void> {
    try {
      const user = await this.userService.updateById(
        Number(this.userId),
        this.editUserForm.value
      );
      Swal.fire(
        'Edicion',
        `Usuario ${user.updatedUser.username} actualizado correctamente`,
        'success'
      );
      this.router.navigateByUrl('/users');
    } catch (error) {
      Swal.fire('Error', 'Error al actualizar el usuario', 'error');
    }
  }
  cancel(): void {
    this.router.navigateByUrl('/users');
  }
}

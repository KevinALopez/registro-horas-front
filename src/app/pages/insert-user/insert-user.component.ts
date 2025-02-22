import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-insert-user',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent,
    CardComponent
],
  templateUrl: './insert-user.component.html',
  styleUrl: './insert-user.component.css'
})
export class InsertUserComponent {
  userService = inject(UsersService);
  insertUserForm: FormGroup;
  router = inject(Router);


  constructor() {
    this.insertUserForm = new FormGroup({
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
      role: new FormControl('', [
        Validators.required,
      ]),
      contract: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/), // Solo números positivos (del 1 en adelante)
      ]),
    });
  }
  async setData() {
    try {
      const user = await this.userService.register(this.insertUserForm.value);
      if (user) {
        Swal.fire("Usuario creado", "Usuario creado correctamente", "success");
        this.insertUserForm.reset();
      }
    } catch (error) {
      Swal.fire("Error", "Error al crear usuario", "error");
    }
  }
  validate(campo: string) {
    return (
      this.insertUserForm.get(campo)?.invalid && this.insertUserForm.get(campo)?.touched
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/users');
  }


}

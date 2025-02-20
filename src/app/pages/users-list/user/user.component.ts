import { Component, Input } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user!: IUser;

  deleteById(id: Number) {
    Swal.fire({
      title: '¿Eliminar a este usuario?',
      text: 'Esta accion eliminara al usuario de manera permanente. ¿Estas seguro de querer continuar?',
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });
  }
}

import { ProjectsService } from './../../../services/projects.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input() user!: IUser;
  @Output() userDeleted = new EventEmitter();
  usersService = inject(UsersService);

  async deleteById(id: number) {
    try {
      const userInput = await Swal.fire({
        title: '¿Eliminar este usuario?',
        text: 'Esta accion eliminara al usuario de manera permanente. ¿Estas seguro de querer continuar?',
        icon: 'warning',
        reverseButtons: true,
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      });
      if (!userInput.isConfirmed) return;

      await this.usersService.deleteById(id);
      Swal.fire(
        'Eliminacion de un usuario',
        'El usuario fue eliminado con exito.',
        'success'
      );

      this.userDeleted.emit();
    } catch ({ message }: any) {
      Swal.fire('Eliminacion de un usuario', message, 'error');
    }
  }
}

import { Component, inject, Input, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  userService = inject(UsersService);
  user?: IUser;
  @Input() id?: number;

  async ngOnInit(): Promise<void> {
    try {
      if (this.id !== undefined) {
        this.user = await this.userService.getById(this.id);
      }
    } catch (error) {
      Swal.fire('Error', 'Error al obtener el usuario', 'error');
    }
  }
}

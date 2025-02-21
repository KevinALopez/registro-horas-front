import { UsersService } from './../../services/users.service';
import { Component, inject } from '@angular/core';
import { UserComponent } from "./user/user.component";
import { IUser } from '../../interfaces/iuser';
import { filters, FiltersUsersComponent } from "./filters-users/filters-users.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  imports: [UserComponent, FiltersUsersComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: IUser[] = []
  usersService = inject(UsersService)

  async ngOnInit() {
    try {
      const response = await this.usersService.getAll()

      this.users = response;
    } catch ({ message }: any) {
      Swal.fire('Error al obetener los usuarios', message, 'error')
    }
  }
  async onProjectDeleted() {
    try {
      const response = await this.usersService.getAll();

      this.users = response;
    } catch ({ message }: any) {
      Swal.fire('Error al obtener los proyectos', message, 'error');
    }
  }
  async filterUsers(filter: filters) {
    try {
      const response = await this.usersService.getAll();

      if (filter.status === 'all') {
        this.users = response.filter((user) => {
          return user.username.toLowerCase().includes(filter.username.toLowerCase());
        });

        return;
      }

      this.users = response
        .filter((user) => {
          return user.username.toLowerCase().includes(filter.username.toLowerCase());
        })

    } catch ({ message }: any) {
      Swal.fire('Error al obtener los proyectos', message, 'error');
    }
  }
}
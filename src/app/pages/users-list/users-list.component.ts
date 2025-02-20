import { UsersService } from './../../services/users.service';
import { Component, inject } from '@angular/core';
import { UserComponent } from "./user/user.component";
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-users-list',
  imports: [UserComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: IUser[] = []
  usersService = inject(UsersService)

  async ngOnInit() {
    const response = await this.usersService.getAll()
    this.users = response;

  }
}

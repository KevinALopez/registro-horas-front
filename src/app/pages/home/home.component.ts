import { Component, inject } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { HoursHistoryComponent } from './hours-history/hours-history.component';

@Component({
  selector: 'app-home',
  imports: [StopwatchComponent, HoursHistoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  loggedUser!: IUser;

  userService = inject(UsersService);

  async ngOnInit() {
    try {
      this.loggedUser = await this.userService.getLoggedUser();
    } catch ({ message }: any) {
      Swal.fire('Error', message, 'error');
    }
  }
}

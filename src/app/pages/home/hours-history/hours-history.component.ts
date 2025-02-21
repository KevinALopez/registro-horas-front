import { Component, inject } from '@angular/core';
import { HourEntryComponent } from './hour-entry/hour-entry.component';
import { HoursService } from '../../../services/hours.service';
import { UsersService } from '../../../services/users.service';

export type HoursRecords = {
  id: number;
  hours: number;
  dateTime: string;
  user: {
    userId: number;
    username: string;
    contract: number;
  };
  project: {
    projectId: number;
    name: string;
    status: string;
  };
};

@Component({
  selector: 'app-hours-history',
  imports: [HourEntryComponent],
  templateUrl: './hours-history.component.html',
  styleUrl: './hours-history.component.css',
})
export class HoursHistoryComponent {
  history: HoursRecords[] = [];

  hoursService = inject(HoursService);
  userService = inject(UsersService);

  async ngOnInit(): Promise<void> {
    const { data } = await this.hoursService.getHoursInMonth(
      new Date().getMonth() + 1,
      new Date().getFullYear()
    );

    const loggedUser = await this.userService.getLoggedUser();

    this.history = data
      .filter((hour) => hour.user.userId === loggedUser.id)
      .reverse();
  }
}

import { Component, inject } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HoursService } from '../../services/hours.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [StopwatchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  hoursService = inject(HoursService);

  payload = {
    id: 23,
    end: formatDate(Date.now() + 3600000, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
  };

  async test() {
    const response = await this.hoursService.registerPauseEnd(
      this.payload.end,
      14
    );

    console.log(response);
  }
}

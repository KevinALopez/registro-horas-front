import { Component, inject } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HoursService } from '../../services/hours.service';

@Component({
  selector: 'app-home',
  imports: [StopwatchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  hoursService = inject(HoursService);

  payload = {};

  async test() {
    const response = await this.hoursService.getHoursInMonth(2, 2024);

    console.log(response.data);
  }
}

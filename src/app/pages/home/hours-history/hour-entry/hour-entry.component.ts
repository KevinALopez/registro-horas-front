import { Component, Input } from '@angular/core';
import { HoursRecords } from '../hours-history.component';

@Component({
  selector: 'app-hour-entry',
  imports: [],
  templateUrl: './hour-entry.component.html',
  styleUrl: './hour-entry.component.css',
})
export class HourEntryComponent {
  @Input()
  record!: HoursRecords;
}

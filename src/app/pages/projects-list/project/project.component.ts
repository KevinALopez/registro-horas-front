import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  project = {
    id: 6,
    name: 'Project F',
    description: 'Security Audit',
    start: '2024-06-20T07:15:00.000Z',
    end: '2024-12-20T17:15:00.000Z',
    status: 'cancel',
    estimated_hours: '100.00',
    worked_hours: '10.00',
  };
}

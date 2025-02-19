import { Component, inject } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HeaderComponent } from '../../component/header/header.component';
import { HttpClient } from '@angular/common/http';
import { ProjectsService } from '../../services/projects.service';
import { IProject } from '../../interfaces/iproject';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [StopwatchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  projectsService = inject(ProjectsService);

  payload: IProject = {
    name: 'hahahaha',
    description: 'API Development',
    start: formatDate(Date.now(), 'YYYY-MM-dd HH:mm:ss', 'en-US'),
    end: formatDate(Date.now(), 'YYYY-MM-dd HH:mm:ss', 'en-US'),
    status: 'finish',
    estimatedHours: 200.0,
    workedHours: 400.0,
  };

  async testIt() {
    const response = await this.projectsService.getAll();
    console.log(response.data);
  }
}

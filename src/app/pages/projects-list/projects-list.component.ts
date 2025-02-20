import { Component, inject } from '@angular/core';
import { ProjectComponent } from './project/project.component';
import { ProjectsService } from '../../services/projects.service';
import { IProject } from '../../interfaces/iproject';

@Component({
  selector: 'app-projects-list',
  imports: [ProjectComponent],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
})
export class ProjectsListComponent {
  projects: IProject[] = [];

  projectsService = inject(ProjectsService);

  async ngOnInit() {
    const { data } = await this.projectsService.getAll();

    this.projects = data;
  }
}

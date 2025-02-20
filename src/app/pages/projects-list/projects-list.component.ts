import { Component, inject } from '@angular/core';
import { ProjectComponent } from './project/project.component';
import { ProjectsService } from '../../services/projects.service';
import { IProject } from '../../interfaces/iproject';
import Swal from 'sweetalert2';
import {
  filters,
  ListFiltersComponent,
} from './list-filters/list-filters.component';

@Component({
  selector: 'app-projects-list',
  imports: [ProjectComponent, ListFiltersComponent],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
})
export class ProjectsListComponent {
  projects: IProject[] = [];

  projectsService = inject(ProjectsService);

  async ngOnInit() {
    try {
      const { data } = await this.projectsService.getAll();

      this.projects = data;
    } catch ({ message }: any) {
      Swal.fire('Error al obtener los proyectos', message, 'error');
    }
  }

  async onProjectDeleted() {
    try {
      const { data } = await this.projectsService.getAll();

      this.projects = data;
    } catch ({ message }: any) {
      Swal.fire('Error al obtener los proyectos', message, 'error');
    }
  }

  async filterProjects(filter: filters) {
    try {
      const { data } = await this.projectsService.getAll();

      if (filter.status === 'all') {
        this.projects = data.filter((project) => {
          return project.name.toLowerCase().includes(filter.name.toLowerCase());
        });

        return;
      }

      this.projects = data
        .filter((project) => {
          return project.name.toLowerCase().includes(filter.name.toLowerCase());
        })
        .filter((project) => {
          return project.status === filter.status;
        });
    } catch ({ message }: any) {
      Swal.fire('Error al obtener los proyectos', message, 'error');
    }
  }
}

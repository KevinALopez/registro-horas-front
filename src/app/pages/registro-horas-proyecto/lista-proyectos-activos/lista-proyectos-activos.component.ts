import { Component, inject } from '@angular/core';
import { IProject } from '../../../interfaces/iproject';
import { ProjectsService } from '../../../services/projects.service';
import Swal from 'sweetalert2';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProyectoActivoComponent } from './proyecto-activo/proyecto-activo.component';

@Component({
  selector: 'app-lista-proyectos-activos',
  imports: [SearchBarComponent, ProyectoActivoComponent],
  templateUrl: './lista-proyectos-activos.component.html',
  styleUrl: './lista-proyectos-activos.component.css',
})
export class ListaProyectosActivosComponent {
  projects: IProject[] = [];
  selectedProject: IProject = {} as IProject;

  projectsService = inject(ProjectsService);

  async ngOnInit() {
    try {
      const { data } = await this.projectsService.getAll();

      this.projects = data.filter((project) => project.status === 'active');
    } catch ({ message }: any) {
      Swal.fire('Error al obtener los proyectos activos', message, 'error');
    }
  }

  selectProject(project: IProject) {
    if (this.selectedProject.id === project.id) {
      this.selectedProject = {} as IProject;
      return;
    }

    this.selectedProject = project;
  }

  async filterProjects(filter: string) {
    const { data } = await this.projectsService.getAll();

    this.projects = data
      .filter((project) => {
        return project.name.toLowerCase().includes(filter.toLowerCase());
      })
      .filter((project) => project.status === 'active');
  }
}

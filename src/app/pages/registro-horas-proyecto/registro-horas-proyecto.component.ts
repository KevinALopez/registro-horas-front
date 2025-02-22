import { Component } from '@angular/core';
import { RegistrarHorasFormComponent } from './registrar-horas-form/registrar-horas-form.component';
import { ListaProyectosActivosComponent } from './lista-proyectos-activos/lista-proyectos-activos.component';
import { IProject } from '../../interfaces/iproject';

@Component({
  selector: 'app-registro-horas-proyecto',
  imports: [RegistrarHorasFormComponent, ListaProyectosActivosComponent],
  templateUrl: './registro-horas-proyecto.component.html',
  styleUrl: './registro-horas-proyecto.component.css',
})
export class RegistroHorasProyectoComponent {
  selectedProject: IProject = {} as IProject;
  isProjectSelected = false;

  getSelectedProject(project: IProject) {
    this.selectedProject = project;

    this.isProjectSelected = this.selectedProject.id ? true : false;
  }
}

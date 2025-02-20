import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IProject } from '../../../interfaces/iproject';
import Swal from 'sweetalert2';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  @Input() project!: IProject;
  @Output() projectDeleted = new EventEmitter();

  projectService = inject(ProjectsService);

  async deleteProject(projectId: number) {
    try {
      const userInput = await Swal.fire({
        title: '¿Eliminar este proyecto?',
        text: 'Esta accion eliminara el proyecto de manera permanente. ¿Estas seguro de querer continuar?',
        icon: 'warning',
        reverseButtons: true,
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      });

      if (!userInput.isConfirmed) return;

      await this.projectService.deleteById(projectId);

      Swal.fire(
        'Eliminacion de un proyecto',
        'El proyecto fue eliminado con exito.',
        'success'
      );

      this.projectDeleted.emit();
    } catch ({ message }: any) {
      Swal.fire('Eliminacion de un proyecto', message, 'error');
    }
  }
}

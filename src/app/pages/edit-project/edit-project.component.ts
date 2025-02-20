import { IProject } from './../../interfaces/iproject';
import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { NavSidebarComponent } from "../../component/nav-sidebar/nav-sidebar.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  imports: [HeaderComponent, NavSidebarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {

  editProjectForm: FormGroup;
  // arrProjects: { data: IProject[] } = { data: [] };
  projectsService = inject(ProjectsService);
  @Input() projectId!: number;
  router = inject(Router);

  constructor() {
    this.editProjectForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
      status: new FormControl(),
      estimatedHours: new FormControl(),
      workedHours: new FormControl()
    }
    );
  }
  async ngOnInit() {
    // this.arrProjects = await this.projectsService.getAll();//TODO: crear funcion para llenar selector de status 
    const project = await this.projectsService.getById(this.projectId);

    const { name, description, start, end, status, estimatedHours, workedHours } = project;

    this.editProjectForm.setValue({ name, description, start, end, status, estimatedHours, workedHours });
  }

  async onSubmit() {
    try {
      const project = await this.projectsService.updateById(this.projectId, this.editProjectForm.value);

      Swal.fire('Edición', `Se ha actualizado el proyecto: ${project.updatedProject.name}`, 'success');
      this.router.navigateByUrl('/home'); // TODO: redirigir a la lista de proyectos
    } catch (error) {
      Swal.fire('Edición', 'Ha ocurrido un error. Vuelve a intentarlo', 'error');
    }
  }




}

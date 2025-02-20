import { IProject } from './../../interfaces/iproject';
import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { NavSidebarComponent } from "../../component/nav-sidebar/nav-sidebar.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      start: new FormControl("", [
        Validators.required
        // TODO:crear validador donde la fecha de end no sea anterior a la de start
      ]),
      end: new FormControl("", [
        Validators.required
      ]),
      status: new FormControl("", [
        Validators.required
      ]),
      estimatedHours: new FormControl("", [
        Validators.required,
        Validators.pattern("^(?:[1-9]|[1-9][0-9]|[1-9][0-9]{2})$")
      ]),
      workedHours: new FormControl("", [
        Validators.required,
        Validators.pattern("^(?:[1-9]|[1-9][0-9]|[1-9][0-9]{2})$")
      ])
    }
    );
  }
  async ngOnInit() {
    // this.arrProjects = await this.projectsService.getAll();//TODO: crear funcion para llenar selector de status 
    const project = await this.projectsService.getById(this.projectId);

    // formateo de string a tipo datetime
    project.start = new Date(project.start).toISOString().slice(0, 16);
    project.end = new Date(project.end).toISOString().slice(0, 16);


    const { name, description, start, end, status, estimatedHours, workedHours } = project;

    this.editProjectForm.setValue({ name, description, start, end, status, estimatedHours, workedHours });
  }

  async onSubmit() {
    try {
      const project = await this.projectsService.updateById(this.projectId, this.editProjectForm.value);

      Swal.fire('Edición', `Se ha actualizado el proyecto: ${project.updatedProject.name}`, 'success');
      this.router.navigateByUrl('/projects'); // TODO: redirigir a la lista de proyectos
    } catch (error) {
      Swal.fire('Edición', 'Ha ocurrido un error. Vuelve a intentarlo', 'error');
    }
  }

  checkFieldError(field: string, error: string): boolean {
    if (this.editProjectForm.get(field)?.hasError(error) && this.editProjectForm.get(field)?.touched) {
      return true;
    }
    return false;
  }
  cancel() {
    this.router.navigateByUrl('/users');
  }


}

import { Component, inject, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

type formData = {
  name: string;
  description: string;
  start: string;
  end: string;
  status: string;
  estimated_hours: number;
  worked_hours: number;
};

@Component({
  selector: 'app-edit-project',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent {
  editProjectForm: FormGroup;

  projectsService = inject(ProjectsService);
  @Input() projectId!: number;
  router = inject(Router);

  constructor() {
    this.editProjectForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        estimatedHours: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?:[1-9]|[1-9][0-9]|[1-9][0-9]{2})$'),
        ]),
        workedHours: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?:[1-9]|[1-9][0-9]|[1-9][0-9]{2})$'),
        ]),
      },
      [this.validateStartEnd]
    );
  }
  async ngOnInit() {
    try {
      const project = await this.projectsService.getById(this.projectId);
      // formateo de string a tipo datetime
      project.start = new Date(project.start).toISOString().slice(0, 16);
      project.end = new Date(project.end).toISOString().slice(0, 16);

      const {
        name,
        description,
        start,
        end,
        status,
        estimatedHours,
        workedHours,
      } = project;
      this.editProjectForm.setValue({
        name,
        description,
        start,
        end,
        status,
        estimatedHours,
        workedHours,
      });
    } catch (error) {
      Swal.fire(
        '',
        `Ha ocurrido un error. No existe proyecto con id: ${this.projectId}`,
        'error'
      );
      this.router.navigateByUrl('/projects');
    }
  }

  async onSubmit() {
    try {
      const project = await this.projectsService.updateById(
        this.projectId,
        this.editProjectForm.value
      );

      Swal.fire(
        'Edición',
        `Se ha actualizado el proyecto: ${project.updatedProject.name}`,
        'success'
      );
      this.router.navigateByUrl('/projects');
    } catch (error) {
      Swal.fire(
        'Edición',
        'Ha ocurrido un error. Vuelve a intentarlo',
        'error'
      );
    }
  }

  checkFieldError(field: string, error: string): boolean {
    if (
      this.editProjectForm.get(field)?.hasError(error) &&
      this.editProjectForm.get(field)?.touched
    ) {
      return true;
    }
    return false;
  }

  cancel() {
    this.router.navigateByUrl('/projects');
  }

  //validador de fechas de start y end
  validateStartEnd(formFields: AbstractControl) {
    const start = formFields.get('start')?.value;
    const end = formFields.get('end')?.value;

    if (!(start && end)) return null; //se comprueba primero que los campos no vengan vacíos

    //se convierten las fechas a milisegundos y se compara si endDate es anterior a startDate
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    return endDate < startDate ? { validatestartend: true } : null;
  }
}

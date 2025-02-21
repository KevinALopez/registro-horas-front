import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavSidebarComponent } from '../../components/header/nav-sidebar/nav-sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-create-project',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavSidebarComponent,
    HeaderComponent,
  ],
  templateUrl: './form-create-project.component.html',
  styleUrl: './form-create-project.component.css',
})
export class FormCreateProjectComponent {
  projectService = inject(ProjectsService);
  postForm: FormGroup;

  constructor() {
    this.postForm = new FormGroup(
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
  async setDataPost() {
    try {
      const project = await this.projectService.createNewProject(this.postForm.value);
      alert("Proyecto creado con exito");
      this.postForm.reset();
    } catch (error) {
      Swal.fire("Error", "Error al crear el proyecto", "error");
    }
  }
  //validacion
  validate(campo: string) {
    return (
      this.postForm.get(campo)?.invalid && this.postForm.get(campo)?.touched
    );
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

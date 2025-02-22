import { Component, inject, Input } from '@angular/core';
import { IProject } from '../../../interfaces/iproject';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';

export type availableTime = {
  hours: number;
  minutes: number;
};

@Component({
  selector: 'app-registrar-horas-form',
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-horas-form.component.html',
  styleUrl: './registrar-horas-form.component.css',
})
export class RegistrarHorasFormComponent {
  @Input() project!: IProject;

  availableTime!: availableTime;
  formModel: FormGroup;

  userService = inject(UsersService);

  constructor() {
    this.formModel = new FormGroup({
      hours: new FormControl(),
    });
  }

  async ngOnInit() {
    try {
      this.availableTime = await this.userService.getUnassignedTime();
    } catch (error) {
      this.availableTime = { hours: 0, minutes: 0 };
      Swal.fire('Error', 'Error al obtener el tiempo disponible', 'error');
    }
  }

  logHours() {
    console.log(this.formModel.value);
  }
}

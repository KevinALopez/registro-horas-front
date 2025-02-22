import { Component, inject, Input } from '@angular/core';
import { IProject } from '../../../interfaces/iproject';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { HoursService } from '../../../services/hours.service';

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

  availableTime: availableTime = {
    hours: 0,
    minutes: 0,
  };
  formModel: FormGroup;

  userService = inject(UsersService);
  hoursService = inject(HoursService);

  constructor() {
    this.formModel = new FormGroup(
      {
        hours: new FormControl('', [Validators.required, Validators.min(0)]),
        minutes: new FormControl('', [Validators.required, Validators.min(0)]),
        date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [
          Validators.required,
          this.dateValidator,
        ]),
      },
      []
    );
  }

  async ngOnInit() {
    try {
      this.availableTime = await this.userService.getUnassignedTime();
      this.formModel
        .get('hours')
        ?.addValidators([Validators.max(this.availableTime.hours)]);
      this.formModel
        .get('minutes')
        ?.addValidators([Validators.max(this.availableTime.minutes)]);

      if (this.availableTime.hours === 0)
        this.formModel.get('hours')?.setValue(0);

      if (this.availableTime.minutes === 0)
        this.formModel.get('minutes')?.setValue(0);
    } catch (error) {
      Swal.fire('Error', 'Error al obtener el tiempo disponible', 'error');
    }
  }

  async logHours() {
    try {
      const { id } = await this.userService.getLoggedUser();
      const decimalHours =
        this.formModel.value.hours + this.formModel.value.minutes / 60;

      await this.hoursService.registerHoursOnProject({
        userId: id as number,
        projectId: this.project.id as number,
        date: this.formModel.value.date,
        hours: decimalHours,
      });

      this.formModel.reset();
      this.availableTime = await this.userService.getUnassignedTime();

      Swal.fire(
        'Horas registradas',
        `Horas registradas correctamente`,
        'success'
      );
    } catch (error) {
      Swal.fire('Error', 'Error al registrar las horas', 'error');
    }
  }

  getToday() {
    return formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

  dateValidator(controlName: AbstractControl): any {
    const date = controlName.value;
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

    return date > today ? { dateValidator: true } : null;
  }

  checkErrorField(field: string, error: string): boolean {
    if (
      this.formModel.get(field)?.hasError(error) &&
      this.formModel.get(field)?.touched
    ) {
      return true;
    }
    return false;
  }
}

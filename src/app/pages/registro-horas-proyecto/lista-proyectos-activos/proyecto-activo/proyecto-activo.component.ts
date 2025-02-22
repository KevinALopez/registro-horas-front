import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '../../../../interfaces/iproject';

@Component({
  selector: 'app-proyecto-activo',
  imports: [],
  templateUrl: './proyecto-activo.component.html',
  styleUrl: './proyecto-activo.component.css',
})
export class ProyectoActivoComponent {
  @Input() project!: IProject;
  @Input() selected = false;
}

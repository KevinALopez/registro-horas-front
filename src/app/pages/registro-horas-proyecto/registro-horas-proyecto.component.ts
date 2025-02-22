import { Component } from '@angular/core';
import { RegistrarHorasFormComponent } from './registrar-horas-form/registrar-horas-form.component';
import { ListaProyectosActivosComponent } from './lista-proyectos-activos/lista-proyectos-activos.component';

@Component({
  selector: 'app-registro-horas-proyecto',
  imports: [RegistrarHorasFormComponent, ListaProyectosActivosComponent],
  templateUrl: './registro-horas-proyecto.component.html',
  styleUrl: './registro-horas-proyecto.component.css',
})
export class RegistroHorasProyectoComponent {}

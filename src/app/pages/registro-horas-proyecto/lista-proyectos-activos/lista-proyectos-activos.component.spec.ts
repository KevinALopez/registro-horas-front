import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProyectosActivosComponent } from './lista-proyectos-activos.component';

describe('ListaProyectosActivosComponent', () => {
  let component: ListaProyectosActivosComponent;
  let fixture: ComponentFixture<ListaProyectosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProyectosActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProyectosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

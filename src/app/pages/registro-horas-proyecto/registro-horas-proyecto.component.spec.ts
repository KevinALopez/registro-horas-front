import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHorasProyectoComponent } from './registro-horas-proyecto.component';

describe('RegistroHorasProyectoComponent', () => {
  let component: RegistroHorasProyectoComponent;
  let fixture: ComponentFixture<RegistroHorasProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroHorasProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroHorasProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarHorasFormComponent } from './registrar-horas-form.component';

describe('RegistrarHorasFormComponent', () => {
  let component: RegistrarHorasFormComponent;
  let fixture: ComponentFixture<RegistrarHorasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarHorasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarHorasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

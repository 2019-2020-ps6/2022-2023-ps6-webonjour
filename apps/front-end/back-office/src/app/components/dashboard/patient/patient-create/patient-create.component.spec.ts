import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCreateComponent } from './patient-create.component';
import { PatientEditGeneralMockComponent } from '../patient-edit/patient-edit/patient-edit.component.spec';

describe('PatientCreateComponent', () => {
  let component: PatientCreateComponent;
  let fixture: ComponentFixture<PatientCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientCreateComponent, PatientEditGeneralMockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

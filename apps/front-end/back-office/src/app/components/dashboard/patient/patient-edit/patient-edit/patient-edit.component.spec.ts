import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditComponent } from './patient-edit.component';
import { Component } from '@angular/core';

describe('PatientEditComponent', () => {
  let component: PatientEditComponent;
  let fixture: ComponentFixture<PatientEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PatientEditComponent,
        PatientEditGeneralMockComponent,
        PatientFamilyMockComponent,
        PatientEditQuizMockComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'webonjour-patient-edit-general',
  template: '',
})
export class PatientEditGeneralMockComponent {}

@Component({
  selector: 'webonjour-patient-family',
  template: '',
})
export class PatientFamilyMockComponent {}

@Component({
  selector: 'webonjour-patient-edit-quiz',
  template: '',
})
export class PatientEditQuizMockComponent {}

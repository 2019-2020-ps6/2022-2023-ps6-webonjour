import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditGeneralComponent } from './patient-edit-general.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MockCustomFieldComponent } from '../../../../quiz-creation/quiz-create/quiz-create.component.spec';

describe('PatientEditGeneralComponent', () => {
  let component: PatientEditGeneralComponent;
  let fixture: ComponentFixture<PatientEditGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientEditGeneralComponent, MockCustomFieldComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        CommonModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

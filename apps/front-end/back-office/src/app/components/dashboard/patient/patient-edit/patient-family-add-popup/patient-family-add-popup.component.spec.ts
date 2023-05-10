import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFamilyAddPopupComponent } from './patient-family-add-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MockCustomFieldComponent } from '../../../../quiz-creation/quiz-create/quiz-create.component.spec';

describe('PatientFamilyAddPopupComponent', () => {
  let component: PatientFamilyAddPopupComponent;
  let fixture: ComponentFixture<PatientFamilyAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientFamilyAddPopupComponent, MockCustomFieldComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        CommonModule,
        MatTableModule,
        RouterTestingModule,
      ],
      providers: [
        {
          // activated route
          provide: 'ActivatedRoute',
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '123';
                },
              },
            },
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            patientId: 1,
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientFamilyAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

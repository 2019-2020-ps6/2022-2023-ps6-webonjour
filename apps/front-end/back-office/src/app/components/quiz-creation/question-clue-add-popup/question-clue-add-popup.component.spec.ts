import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionClueAddPopupComponent } from './question-clue-add-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionClueAddPopupComponent', () => {
  let component: QuestionClueAddPopupComponent;
  let fixture: ComponentFixture<QuestionClueAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionClueAddPopupComponent],
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            patientId: 1,
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionClueAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

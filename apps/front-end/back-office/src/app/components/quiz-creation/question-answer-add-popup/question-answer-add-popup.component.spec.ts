import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerAddPopupComponent } from './question-answer-add-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionAnswerAddPopupComponent', () => {
  let component: QuestionAnswerAddPopupComponent;
  let fixture: ComponentFixture<QuestionAnswerAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionAnswerAddPopupComponent],
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

    fixture = TestBed.createComponent(QuestionAnswerAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

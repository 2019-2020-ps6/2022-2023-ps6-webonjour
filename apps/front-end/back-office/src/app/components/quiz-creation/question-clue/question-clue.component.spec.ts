import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionClueComponent } from './question-clue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionClueComponent', () => {
  let component: QuestionClueComponent;
  let fixture: ComponentFixture<QuestionClueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionClueComponent],
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

    fixture = TestBed.createComponent(QuestionClueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

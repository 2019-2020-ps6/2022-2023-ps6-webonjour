import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerComponent } from './question-answer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionAnswerComponent', () => {
  let component: QuestionAnswerComponent;
  let fixture: ComponentFixture<QuestionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionAnswerComponent],
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

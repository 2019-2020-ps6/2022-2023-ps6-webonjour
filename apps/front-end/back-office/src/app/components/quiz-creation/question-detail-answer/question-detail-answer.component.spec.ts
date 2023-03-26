import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailAnswerComponent } from './question-detail-answer.component';

describe('QuestionDetailAnswerComponent', () => {
  let component: QuestionDetailAnswerComponent;
  let fixture: ComponentFixture<QuestionDetailAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailAnswerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDetailAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

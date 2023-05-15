import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quiz } from '@webonjour/util-interface';
import { quizMocks } from '@webonjour/data-access-fake-backend';

import { QuestionDetailAnswersComponent } from './question-detail-answers.component';

describe('QuestionDetailAnswersComponent', () => {
  let component: QuestionDetailAnswersComponent;
  let fixture: ComponentFixture<QuestionDetailAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailAnswersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDetailAnswersComponent);
    component = fixture.componentInstance;
    component.question = quizMocks.quizList[0].questions[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

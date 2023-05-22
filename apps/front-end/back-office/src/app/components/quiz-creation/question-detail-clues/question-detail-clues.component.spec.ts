import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailCluesComponent } from './question-detail-clues.component';
import { QuestionType } from '@prisma/client';

describe('QuestionDetailCluesComponent', () => {
  let component: QuestionDetailCluesComponent;
  let fixture: ComponentFixture<QuestionDetailCluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailCluesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionDetailCluesComponent);
    component = fixture.componentInstance;
    component.question = {
      id: 1,
      title: 'test',
      image: '',
      type: QuestionType.CHOICE,
      quizId: 1,
      answers: [],
      clues: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

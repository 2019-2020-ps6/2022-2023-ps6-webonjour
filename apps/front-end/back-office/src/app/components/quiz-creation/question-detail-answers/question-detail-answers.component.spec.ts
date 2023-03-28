import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

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
    component.question = {
      answers: [],
      clues: [],
      title: 'test',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

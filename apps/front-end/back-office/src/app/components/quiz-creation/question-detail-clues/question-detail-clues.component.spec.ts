import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailCluesComponent } from './question-detail-clues.component';
import { Quiz } from '@webonjour/util-interface';

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
      id: '',
      answers: [],
      clues: [],
      title: 'test',
      type: Quiz.QuestionType.CHOICE,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

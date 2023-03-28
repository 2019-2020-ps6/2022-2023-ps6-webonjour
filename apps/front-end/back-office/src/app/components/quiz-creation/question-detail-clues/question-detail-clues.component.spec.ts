import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailCluesComponent } from './question-detail-clues.component';

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

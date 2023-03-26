import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListItemComponent } from './quiz-list-item.component';
import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

describe('QuizListItemComponent', () => {
  let component: QuizListItemComponent;
  let fixture: ComponentFixture<QuizListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizListItemComponent, MockQuizItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: '',
  selector: 'webonjour-quiz-item',
})
class MockQuizItemComponent {
  @Input() quiz = {} as Quiz.Quiz;
}

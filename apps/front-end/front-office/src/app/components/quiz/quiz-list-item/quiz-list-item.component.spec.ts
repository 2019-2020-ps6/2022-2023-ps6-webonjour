import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListItemComponent } from './quiz-list-item.component';
import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuizListItemComponent', () => {
  let component: QuizListItemComponent;
  let fixture: ComponentFixture<QuizListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizListItemComponent, MockQuizItemComponent],
      imports: [RouterTestingModule],
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

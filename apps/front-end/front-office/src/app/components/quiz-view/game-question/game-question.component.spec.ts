import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameQuestionComponent } from './game-question.component';
import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { RouterTestingModule } from '@angular/router/testing';

describe('GameQuestionComponent', () => {
  let component: GameQuestionComponent;
  let fixture: ComponentFixture<GameQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameQuestionComponent, MockGameAnswerComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GameQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'webonjour-game-answer',
  template: '',
})
class MockGameAnswerComponent {
  @Input() question = {} as Quiz.Question;
  @Input() answer = '';
}

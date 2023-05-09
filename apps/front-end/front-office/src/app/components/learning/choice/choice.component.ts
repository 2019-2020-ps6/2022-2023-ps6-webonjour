import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { learntQuestion } from '../../../reducers/game/game.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'webonjour-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements OnInit {
  @Input() question!: Quiz.Question;
  rightAnswers!: Quiz.Answer[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.rightAnswers = this.question.answers.filter((answer) => {
      return answer.isCorrect;
    });
  }

  nextQuestion() {
    this.store.dispatch(learntQuestion({ question: this.question }));
  }
}

import { Component, Input, OnInit } from '@angular/core';
import {
  learntQuestion,
  usefulClick,
} from '../../../reducers/game/game.actions';
import { Store } from '@ngrx/store';
import { Answer, Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-choice',
  templateUrl: './choice.component.html',
})
export class ChoiceComponent implements OnInit {
  @Input()
  question!: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;
  rightAnswers!: Answer[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.rightAnswers = this.question.answers.filter((answer) => {
      return answer.isCorrect;
    });
  }

  nextQuestion() {
    this.store.dispatch(learntQuestion({ question: this.question }));
    this.store.dispatch(usefulClick());
  }
}

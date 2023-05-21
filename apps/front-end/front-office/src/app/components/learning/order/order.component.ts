import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Store } from '@ngrx/store';
import { learntQuestion } from '../../../reducers/game/game.actions';
import { Prisma } from '@prisma/client';

@Component({
  selector: 'webonjour-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input()
  question!: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

  constructor(private store: Store) {}

  nextQuestion() {
    this.store.dispatch(learntQuestion({ question: this.question }));
  }
}

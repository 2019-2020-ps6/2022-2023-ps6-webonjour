import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Store } from '@ngrx/store';
import { Prisma } from '@prisma/client';
import {
  learntQuestion,
  usefulClick,
} from '../../../reducers/game/game.actions';

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
    this.store.dispatch(usefulClick());
  }
}

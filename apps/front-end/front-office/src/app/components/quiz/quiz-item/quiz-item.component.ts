import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as GameActions from '../../../reducers/game/game.actions';
import { Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
})
export class QuizItemComponent {
  @Input() quiz: Prisma.QuizGetPayload<Quiz.QuizWithQuestions> = {
    id: 1,
    title: '',
    imageUrl: '',
    questions: [],
    isPrivate: false,
  };
  hover = false;

  get quizTitle(): string {
    return this.quiz.title;
  }

  get quizImageUrl(): string {
    return this.quiz.imageUrl || '';
  }

  constructor(private router: Router, private store: Store) {}

  onHover(hover: boolean) {
    this.hover = hover;
  }

  onClick() {
    this.store.dispatch(GameActions.initGame({ quizId: this.quiz.id }));
  }
}

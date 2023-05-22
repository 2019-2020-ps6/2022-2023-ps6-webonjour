import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectQuestionsToLearn } from '../../reducers/game/game.selectors';
import { Prisma, QuestionType } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-learning',
  templateUrl: './learning.component.html',
})
export class LearningComponent implements OnDestroy, OnInit {
  QuestionType = QuestionType;
  question!: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectQuestionsToLearn)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((questionsToLearn) => {
        if (questionsToLearn) {
          this.question = questionsToLearn[questionsToLearn.length - 1];
        }
      });
  }
}

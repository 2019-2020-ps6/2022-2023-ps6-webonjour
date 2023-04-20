import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as GameActions from './game.actions';

import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { QuizService } from '@webonjour/front-end/shared/common';
import { selectGameState } from './game.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class GameEffects {
  private stopwatch: number;

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private store: Store,
    private router: Router
  ) {
    this.stopwatch = Date.now();
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.initGame),
      mergeMap((action) =>
        this.quizService.getById(action.quizId).pipe(
          map((quiz) => {
            console.log('quiz', quiz);
            this.router.navigate(['/quiz-answer']);
            return GameActions.loadGameSuccess({
              quiz: quiz.data,
            });
          }),
          catchError((error) => of(GameActions.loadGameFailure({ error })))
        )
      )
    )
  );

  chooseAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.chooseAnswer),
      withLatestFrom(this.store.select(selectGameState)),
      switchMap(([action]) => {
        const { isCorrect } = action;
        const delta = Date.now() - this.stopwatch;
        this.stopwatch = Date.now();
        if (isCorrect) {
          return of(GameActions.correctAnswer({ delta }));
        }
        return of(GameActions.wrongAnswer({ delta }));
      })
    )
  );

  nextQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.nextQuestion),
      withLatestFrom(this.store.select(selectGameState)),
      switchMap(([, state]) => {
        const { quiz, currentQuestion } = state;
        if (quiz) {
          if (currentQuestion < quiz.questions.length - 1) {
            return EMPTY;
          }
        }
        return of(GameActions.endGame());
      })
    )
  );

  correctAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.correctAnswer),
      withLatestFrom(this.store.select(selectGameState)),
      switchMap(([, state]) => {
        const { quiz } = state;
        if (quiz) {
          return of(GameActions.nextQuestion());
        }
        return EMPTY;
      })
    )
  );

  endGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.endGame),
      withLatestFrom(this.store.select(selectGameState)),
      switchMap(([, state]) => {
        const { quiz } = state;
        this.router.navigate(['/result']).then();
        if (quiz) {
          return of(GameActions.loadGameSuccess({ quiz }));
        }
        return EMPTY;
      })
    )
  );
}

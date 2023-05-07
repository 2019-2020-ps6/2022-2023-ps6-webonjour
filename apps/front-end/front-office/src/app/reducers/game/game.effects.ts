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
import {
  PatientService,
  QuizService,
} from '@webonjour/front-end/shared/common';
import {
  selectGameCurrentQuestion,
  selectGameState,
  selectPatient,
  selectQuestionsToLearn,
} from './game.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';

@Injectable()
export class GameEffects {
  private stopwatch: number;

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private patientService: PatientService,
    private store: Store,
    private router: Router
  ) {
    this.stopwatch = Date.now();
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.initGame),
      withLatestFrom(this.store.select(selectPatient)),
      mergeMap(([action, patient]) =>
        this.quizService.getById(action.quizId).pipe(
          mergeMap((quiz) => {
            if (!patient) {
              return of(
                GameActions.loadGameFailure({ error: 'No patient found' })
              );
            }
            return this.patientService.getPatientAccommodation(patient.id).pipe(
              map((accommodation) => {
                this.redirectToCorrectQuestion(quiz.data.questions[0]);
                return GameActions.loadGameSuccess({
                  quiz: quiz.data,
                  accommodation: accommodation.data,
                });
              })
            );
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
      withLatestFrom(
        this.store.select(selectGameCurrentQuestion),
        this.store.select(selectQuestionsToLearn)
      ),
      switchMap(([, currentQuestion, questionsToLearn]) => {
        if (!currentQuestion) {
          return of(GameActions.endGame());
        }

        if (questionsToLearn?.length !== 0) {
          console.log('questionsToLearn effec', questionsToLearn);
          this.router.navigate(['/learning-card']).then();
          return EMPTY;
        }

        this.redirectToCorrectQuestion(currentQuestion);
        return of(GameActions.nextQuestionSuccess());
      })
    )
  );

  correctAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.correctAnswer),
      withLatestFrom(this.store.select(selectGameState)),
      switchMap(([, state]) => {
        const { quiz } = state;

        if (!quiz) {
          return EMPTY;
        }

        return of(GameActions.nextQuestion());
      })
    )
  );

  wrongAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.wrongAnswer),
      withLatestFrom(this.store.select(selectGameState)),
      switchMap(([, state]) => {
        return of(GameActions.nextQuestion());
      })
    )
  );

  learntQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.learntQuestion),
      withLatestFrom(this.store.select(selectGameState)),
      switchMap(([, state]) => {
        const { quiz } = state;
        if (!quiz) {
          return EMPTY;
        }
        return of(GameActions.nextQuestion());
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

        // Something that should never happen
        if (quiz && quiz.title === '☠️☠️☠️☠️☠️☠️☠️☠️☠️') {
          return of(GameActions.error());
        }
        return EMPTY;
      })
    )
  );

  private redirectToCorrectQuestion(question: Quiz.Question) {
    if (question.type === Quiz.QuestionType.CHOICE) {
      this.router.navigate(['/quiz-answer']).then();
    }
    if (question.type === Quiz.QuestionType.REORDER) {
      this.router.navigate(['/drag-and-drop']).then();
    }
  }
}

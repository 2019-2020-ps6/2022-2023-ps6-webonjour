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
  QuestionResultService,
  QuizService,
  QuizSessionService,
} from '@webonjour/front-end/shared/common';
import {
  selectAccommodation,
  selectGameCurrentQuestion,
  selectGameState,
  selectPatient,
  selectQuestionsToLearn,
} from './game.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Prisma, QuestionType } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

@Injectable()
export class GameEffects {
  private stopwatch: number;

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private patientService: PatientService,
    private quizSessionService: QuizSessionService,
    private questionResultService: QuestionResultService,
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
              mergeMap((accommodation) => {
                return this.quizSessionService
                  .createQuizSession({
                    quiz: {
                      connect: {
                        id: quiz.data.id,
                      },
                    },
                    patient: {
                      connect: {
                        id: patient.id,
                      },
                    },
                  })
                  .pipe(
                    map((quizSession) => {
                      this.redirectToCorrectQuestion(quiz.data.questions[0]);
                      return GameActions.loadGameSuccess({
                        quiz: quiz.data,
                        accommodation: accommodation.data,
                        quizSession: quizSession.data,
                      });
                    })
                  );
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
      mergeMap(([action, state]) => {
        const { isCorrect } = action;
        const delta = Date.now() - this.stopwatch;
        this.stopwatch = Date.now();
        if (!state.quizSession || !state.currentQuestion) {
          return EMPTY;
        }

        return this.questionResultService
          .createQuestionResult({
            timeTaken: delta,
            isCorrect,
            question: {
              connect: {
                id: state.currentQuestion.id,
              },
            },
            quizSession: {
              connect: {
                id: state.quizSession.id,
              },
            },
          })
          .pipe(
            map(() => {
              return GameActions.chooseAnswerSuccess();
            })
          );
      })
    )
  );

  nextQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.nextQuestion),
      withLatestFrom(
        this.store.select(selectGameCurrentQuestion),
        this.store.select(selectQuestionsToLearn),
        this.store.select(selectAccommodation)
      ),
      switchMap(
        ([action, currentQuestion, questionsToLearn, accommodations]) => {
          if (
            questionsToLearn?.length !== 0 &&
            !action.skipLearning &&
            accommodations.filter(
              (accommodation) => accommodation.title === "Carte d'apprentissage"
            ).length === 1
          ) {
            this.router.navigate(['/learning-card']).then();
            return EMPTY;
          }
          if (!currentQuestion) {
            return of(GameActions.endGame());
          }
          this.redirectToCorrectQuestion(currentQuestion);
          return of(GameActions.nextQuestionSuccess());
        }
      )
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
        return of(GameActions.nextQuestion({ skipLearning: true }));
      })
    )
  );

  endGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.endGame),
      withLatestFrom(this.store.select(selectGameState)),
      mergeMap(([, state]) => {
        if (!state.quizSession) {
          return of(GameActions.error());
        }

        return this.quizSessionService
          .updateQuizSession(state.quizSession.id, {
            isFinished: true,
          })
          .pipe(
            map(() => {
              this.router.navigate(['/result']).then();
              return GameActions.endGameSuccess();
            })
          );
      })
    )
  );

  skipQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.skipQuestion),
      switchMap(() => {
        return of(GameActions.nextQuestion({ skipLearning: true }));
      })
    )
  );

  private redirectToCorrectQuestion(
    question: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>
  ) {
    if (question.type === QuestionType.CHOICE) {
      this.router.navigate(['/quiz-answer']).then();
    }
    if (question.type === QuestionType.REORDER) {
      this.router.navigate(['/drag-and-drop']).then();
    }
  }
}

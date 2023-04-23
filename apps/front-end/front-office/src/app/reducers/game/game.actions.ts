import { createAction, props } from '@ngrx/store';
import { Patient, Quiz } from '@webonjour/util-interface';

export const initGame = createAction(
  '[Game Page] Init',
  props<{ quizId: string }>()
);

export const loadGameSuccess = createAction(
  '[Game/API] Load Game Success',
  props<{ quiz: Quiz.Quiz }>()
);

export const loadGameFailure = createAction(
  '[Game/API] Load Game Failure',
  props<{ error: string }>()
);

export const error = createAction('[Game Page] Error');

export const chooseAnswer = createAction(
  '[Game Page] Choose Answer',
  props<{
    isCorrect: boolean;
  }>()
);

export const nextQuestion = createAction('[Game Page] Next Question');

export const resetGame = createAction('[Game Page] Reset Game');

export const correctAnswer = createAction(
  '[Game Page] Correct Answer',
  props<{
    delta: number;
  }>()
);

export const learntQuestion = createAction(
  '[Game Page] Learnt Question',
  props<{
    question: Quiz.Question;
  }>()
);

export const wrongAnswer = createAction(
  '[Game Page] Wrong Answer',
  props<{
    delta: number;
  }>()
);

export const endGame = createAction('[Game Page] End Game');

export const setPatient = createAction(
  '[Game Page] Set Patient',
  props<{
    patient: Patient.Patient;
  }>()
);

export const nextQuestionSuccess = createAction(
  '[Game Page] Next Question Success'
);

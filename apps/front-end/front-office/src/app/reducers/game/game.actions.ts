import { createAction, props } from '@ngrx/store';
import { GameEntity } from './game.models';
import { Patient } from '@webonjour/util-interface';

export const initGame = createAction(
  '[Game Page] Init',
  props<{ quizId: string; patient: Patient.Patient }>()
);

export const loadGameSuccess = createAction(
  '[Game/API] Load Game Success',
  props<{ game: GameEntity }>()
);

export const loadGameFailure = createAction(
  '[Game/API] Load Game Failure',
  props<{ error: any }>()
);

export const error = createAction('[Game Page] Error');

export const chooseAnswer = createAction(
  '[Game Page] Choose Answer',
  props<{
    index: number;
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

export const wrongAnswer = createAction(
  '[Game Page] Wrong Answer',
  props<{
    delta: number;
  }>()
);

export const endGame = createAction('[Game Page] End Game');

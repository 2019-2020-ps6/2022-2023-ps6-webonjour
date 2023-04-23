import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as GameActions from './game.actions';
import { GameEntity } from './game.models';

export const GAME_FEATURE_KEY = 'game';

export interface GameState extends GameEntity {
  loaded: boolean; // has the Quiz been loaded
  error?: string | null; // last known error (if any)
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: GameState;
}

export const gameAdapter: EntityAdapter<GameEntity> =
  createEntityAdapter<GameEntity>();

export const initialGameState: GameState = gameAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  score: 0,
  times: [],
  player: null,
  quiz: null,
  wrongQuestions: [],
  remainingQuestions: [],
  accommodation: [],
});

const reducer = createReducer(
  initialGameState,
  on(GameActions.initGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
    score: 0,
    times: [],
    wrongQuestions: [],
    remainingQuestions: [],
  })),
  on(GameActions.loadGameSuccess, (state, { quiz, accommodation }) => ({
    ...state,
    quiz: quiz,
    loaded: true,
    remainingQuestions: quiz.questions,
    accommodation: accommodation,
  })),
  on(GameActions.loadGameFailure, (state, { error }) => ({ ...state, error })),
  on(GameActions.correctAnswer, (state, { delta }) => {
    if (!state.quiz) return state;
    // remove question from remaining questions
    const newRemainingQuestions = state.remainingQuestions.slice(1);

    return {
      ...state,
      score: state.score + 1,
      times: [...state.times, delta],
      remainingQuestions: newRemainingQuestions,
    };
  }),
  on(GameActions.wrongAnswer, (state, { delta }) => {
    if (!state.quiz) return state;
    return {
      ...state,
      score: state.score,
      times: [...state.times, delta],
      wrongQuestions: [...state.wrongQuestions, state.remainingQuestions[0]],
    };
  }),
  on(GameActions.resetGame, (state) => ({
    ...state,
    remainingQuestions: state.quiz?.questions || [],
    score: 0,
    times: [],
  })),
  on(GameActions.setPatient, (state, { patient }) => ({
    ...state,
    player: patient,
  })),
  on(GameActions.learntQuestion, (state, { question }) => {
    if (!state.quiz) return state;
    const newWrongQuestions = state.wrongQuestions.filter(
      (q) => q !== question
    );
    return {
      ...state,
      wrongQuestions: newWrongQuestions,
      remainingQuestions: [...state.remainingQuestions, question],
    };
  })
);

export function gameReducer(state: GameState | undefined, action: Action) {
  return reducer(state, action);
}

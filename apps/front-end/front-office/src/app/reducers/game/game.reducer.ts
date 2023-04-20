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
  currentQuestion: 0,
  score: 0,
  times: [],
  player: null,
  quiz: null,
});

const reducer = createReducer(
  initialGameState,
  on(GameActions.initGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(GameActions.loadGameSuccess, (state, { quiz }) => ({
    ...state,
    quiz: quiz,
    loaded: true,
  })),
  on(GameActions.loadGameFailure, (state, { error }) => ({ ...state, error })),
  on(GameActions.correctAnswer, (state, { delta }) => ({
    ...state,
    score: state.score + 1,
    times: [...state.times, delta],
  })),
  on(GameActions.wrongAnswer, (state, { delta }) => ({
    ...state,
    score: state.score - 1,
    times: [...state.times, delta],
  })),
  on(GameActions.nextQuestion, (state) => ({
    ...state,
    currentQuestion: state.currentQuestion + 1,
  })),
  on(GameActions.resetGame, (state) => ({
    ...state,
    currentQuestion: 0,
    score: 0,
    times: [],
  })),
  on(GameActions.setPatient, (state, { patient }) => ({
    ...state,
    player: patient,
  }))
);

export function gameReducer(state: GameState | undefined, action: Action) {
  return reducer(state, action);
}

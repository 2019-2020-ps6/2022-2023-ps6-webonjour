import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as GameActions from './game.actions';
import { GameEntity } from './game.models';
import { selectAvailableQuestions } from './game.selectors';

export const GAME_FEATURE_KEY = 'game';
let stopwatch = Date.now();
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
  player: null,
  quiz: null,
  currentQuestion: null,
  accommodation: [],
  history: [],
  learntQuestions: [],
  skippedQuestions: [],
  quizSession: null,
  clickCount: 0,
  usefulClick: 0,
});

const reducer = createReducer(
  initialGameState,

  on(GameActions.initGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
    history: [],
    learntQuestions: [],
    skippedQuestions: [],
  })),

  on(
    GameActions.loadGameSuccess,
    (state, { quiz, accommodation, quizSession }) => ({
      ...state,
      quiz: quiz,
      loaded: true,
      accommodation: accommodation,
      // currentQuestion: quiz.questions[Math.floor(Math.random() * quiz.questions.length)],
      currentQuestion: quiz.questions[0],
      history: [],
      quizSession: quizSession,
      clickCount: 0,
      usefulClick: 0,
    })
  ),

  on(GameActions.loadGameFailure, (state, { error }) => ({ ...state, error })),

  on(GameActions.chooseAnswer, (state, { isCorrect }) => {
    if (!state.quiz) return state;
    const delta = Date.now() - stopwatch;
    stopwatch = Date.now();
    return {
      ...state,
      history: [
        ...state.history,
        {
          questionId: state.currentQuestion?.id || -1,
          isCorrect: isCorrect,
          timeTaken: delta,
        },
      ],
    };
  }),

  on(GameActions.resetGame, (state) => ({
    ...state,
    remainingQuestions: state.quiz?.questions || [],
    history: [],
  })),

  on(GameActions.setPatient, (state, { patient }) => ({
    ...state,
    player: patient,
  })),

  on(GameActions.learntQuestion, (state, { question }) => {
    if (!state.quiz) return state;
    return {
      ...state,
      learntQuestions: [...state.learntQuestions, question.id],
    };
  }),

  on(GameActions.nextQuestion, (state) => {
    if (!state.quiz) return state;
    const availableQuestions = selectAvailableQuestions.projector(state);
    return {
      ...state,
      // currentQuestion: availableQuestions[Math.floor(Math.random() * availableQuestions.length)],
      currentQuestion: availableQuestions[0],
    };
  }),

  on(GameActions.skipQuestion, (state) => {
    if (!state.quiz) return state;
    return {
      ...state,
      skippedQuestions: [
        ...state.skippedQuestions,
        state.currentQuestion?.id || -1,
      ],
    };
  }),
  on(GameActions.click, (state) => {
    return {
      ...state,
      clickCount: state.clickCount + 1,
    };
  }),
  on(GameActions.usefulClick, (state) => {
    return {
      ...state,
      usefulClick: state.usefulClick + 1,
    };
  })
);

export function gameReducer(state: GameState | undefined, action: Action) {
  return reducer(state, action);
}

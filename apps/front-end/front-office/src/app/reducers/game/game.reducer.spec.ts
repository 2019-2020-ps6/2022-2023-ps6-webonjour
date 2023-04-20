import { Action } from '@ngrx/store';
import { patientMocks, quizMocks } from '@webonjour/data-access-fake-backend';

import * as GameActions from './game.actions';
import { gameReducer, initialGameState } from './game.reducer';

describe('Game Reducer', () => {
  describe('loading', () => {
    it('loadGameSuccess should set Game', () => {
      const action = GameActions.loadGameSuccess({
        game: {
          quiz: quizMocks.quizList[0],
          score: 0,
          currentQuestion: 0,
          times: [],
          player: patientMocks.patientMocks[0],
        },
      });

      const result = gameReducer(initialGameState, action);

      expect(result).toEqual({
        ...initialGameState,
        loaded: true,
        quiz: quizMocks.quizList[0],
      });
    });
    it('loadGameFailure should set error', () => {
      const action = GameActions.loadGameFailure({ error: 'error' });

      const result = gameReducer(initialGameState, action);

      expect(result).toEqual({
        ...initialGameState,
        error: 'error',
      });
    });
  });

  describe('game', () => {
    it('nextQuestion should set currentQuestion', () => {
      const action = GameActions.nextQuestion();

      const result = gameReducer(initialGameState, action);

      expect(result).toEqual({
        ...initialGameState,
        currentQuestion: 1,
      });
    });

    it('correctAnswer should set score', () => {
      const action = GameActions.correctAnswer({ delta: 1000 });

      const result = gameReducer(initialGameState, action);

      expect(result).toEqual({
        ...initialGameState,
        score: 1,
        times: [1000],
      });
    });

    it('wrongAnswer should set score', () => {
      const action = GameActions.wrongAnswer({ delta: 1000 });

      const result = gameReducer(
        {
          ...initialGameState,
          score: 0,
        },
        action
      );

      expect(result).toEqual({
        ...initialGameState,
        score: -1,
        times: [1000],
      });
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = gameReducer(initialGameState, action);

      expect(result).toBe(initialGameState);
    });
  });
});

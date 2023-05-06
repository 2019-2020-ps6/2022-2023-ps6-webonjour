import { Action } from '@ngrx/store';
import { quizMocks } from '@webonjour/data-access-fake-backend';

import * as GameActions from './game.actions';
import { gameReducer, initialGameState } from './game.reducer';
import { patientMocks } from '@webonjour/data-access-fake-backend';

describe('Game Reducer', () => {
  describe('loading', () => {
    it('loadGameSuccess should set Game', () => {
      const action = GameActions.loadGameSuccess({
        quiz: quizMocks.quizList[0],
        accommodation: patientMocks.accommodationMocks,
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
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = gameReducer(initialGameState, action);

      expect(result).toBe(initialGameState);
    });
  });
});

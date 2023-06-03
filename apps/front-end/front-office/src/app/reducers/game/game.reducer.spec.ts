import { Action } from '@ngrx/store';
import { patientMocks, quizMocks } from '@webonjour/data-access-mocks';

import * as GameActions from './game.actions';
import { gameReducer, initialGameState } from './game.reducer';

describe('Game Reducer', () => {
  describe('loading', () => {
    it('loadGameSuccess should set Game', () => {
      const action = GameActions.loadGameSuccess({
        quiz: quizMocks.quizList[0],
        accommodation: patientMocks.accommodationMocks.map((accommodation) => {
          return {
            ...accommodation,
            id: parseInt(accommodation.id),
          };
        }),
      });

      const result = gameReducer(initialGameState, action);

      expect(result).toEqual({
        ...initialGameState,
        loaded: true,
        quiz: quizMocks.quizList[0],
        accommodation: patientMocks.accommodationMocks.map((accommodation) => {
          return {
            ...accommodation,
            id: parseInt(accommodation.id),
          };
        }),
        currentQuestion: result.currentQuestion,
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
    it('correctAnswer should add to history', () => {
      const action = GameActions.correctAnswer({
        delta: 1000,
      });

      const result = gameReducer(
        {
          ...initialGameState,
          quiz: quizMocks.quizList[0],
          currentQuestion: quizMocks.quizList[0].questions[0],
        },
        action
      );

      expect(result).toEqual({
        ...initialGameState,
        quiz: quizMocks.quizList[0],
        currentQuestion: quizMocks.quizList[0].questions[0],
        history: [
          {
            questionId: 1,
            isCorrect: true,
            timeTaken: 1000,
          },
        ],
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

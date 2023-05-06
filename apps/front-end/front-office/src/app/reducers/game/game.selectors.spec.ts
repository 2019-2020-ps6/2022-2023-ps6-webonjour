import { GamePartialState, initialGameState } from './game.reducer';
import * as GameSelectors from './game.selectors';
import { quizMocks } from '@webonjour/data-access-fake-backend';

describe('Game Selectors', () => {
  const ERROR_MSG = 'No Error Available';

  let state: GamePartialState;

  beforeEach(() => {
    state = {
      game: {
        ...initialGameState,
        loaded: true,
        error: ERROR_MSG,
        quiz: quizMocks.quizList[0],
      },
    };
  });

  describe('Game Selectors', () => {
    it('selectGameLoaded() should return the current "loaded" status', () => {
      const result = GameSelectors.selectGameLoaded(state);

      expect(result).toBe(true);
    });

    it('selectGameError() should return the current "error" state', () => {
      const result = GameSelectors.selectGameError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('selectGame() should return the current "game" state', () => {
      const result = GameSelectors.selectGame(state);

      expect(result).toEqual(state.game);
    });

    it('selectGameQuiz() should return the current "quiz" state', () => {
      const result = GameSelectors.selectGameQuiz(state);

      expect(result).toEqual(state.game.quiz);
    });

    it('selectPatient() should return the current "player" state', () => {
      const result = GameSelectors.selectPatient(state);

      expect(result).toEqual(state.game.player);
    });

    it('selectGameScore() should return the current "score" state', () => {
      const result = GameSelectors.selectGameScore(state);

      expect(result).toEqual(state.game.score);
    });
    it('selectPatientDiseaseStage() should return the current "diseaseStage" state', () => {
      const result = GameSelectors.selectPatientDiseaseStage(state);

      expect(result).toEqual(state.game.player?.diseaseStage);
    });
  });
});

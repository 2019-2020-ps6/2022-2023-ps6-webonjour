import {
  GAME_FEATURE_KEY,
  GamePartialState,
  initialGameState,
} from './game.reducer';
import * as GameSelectors from './game.selectors';
import { quizMocks } from '@webonjour/data-access-mocks';

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
      const result = GameSelectors.selectGameLoaded.projector(
        state[GAME_FEATURE_KEY]
      );

      expect(result).toBe(true);
    });

    it('selectGameError() should return the current "error" state', () => {
      const result = GameSelectors.selectGameError.projector(
        state[GAME_FEATURE_KEY]
      );

      expect(result).toBe(ERROR_MSG);
    });

    it('selectGame() should return the current "game" state', () => {
      const result = GameSelectors.selectGame.projector(
        state[GAME_FEATURE_KEY]
      );

      expect(result).toEqual(state.game);
    });

    it('selectGameQuiz() should return the current "quiz" state', () => {
      const result = GameSelectors.selectGameQuiz.projector(
        state[GAME_FEATURE_KEY]
      );

      expect(result).toEqual(state.game.quiz);
    });

    it('selectPatient() should return the current "player" state', () => {
      const result = GameSelectors.selectPatient.projector(
        state[GAME_FEATURE_KEY]
      );

      expect(result).toEqual(state.game.player);
    });

    it('selectPatientDiseaseStage() should return the current "diseaseStage" state', () => {
      const result = GameSelectors.selectPatientDiseaseStage.projector(
        state[GAME_FEATURE_KEY]
      );

      expect(result).toEqual(state.game.player?.diseaseStage);
    });
  });
});

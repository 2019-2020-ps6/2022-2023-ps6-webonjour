import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GAME_FEATURE_KEY, GameState } from './game.reducer';

// Lookup the 'Game' feature state managed by NgRx
export const selectGameState =
  createFeatureSelector<GameState>(GAME_FEATURE_KEY);

export const selectGame = createSelector(
  selectGameState,
  (state: GameState) => state
);

export const selectGameLoaded = createSelector(
  selectGameState,
  (state: GameState) => state.loaded
);

export const selectGameError = createSelector(
  selectGameState,
  (state: GameState) => state.error
);

export const selectGameQuiz = createSelector(
  selectGameState,
  (state: GameState) => state.quiz
);
export const selectGameCurrentQuestion = createSelector(
  selectGameState,
  (state: GameState) => state.remainingQuestions[0]
);

export const selectPatient = createSelector(
  selectGameState,
  (state: GameState) => state.player
);

export const selectGameScore = createSelector(
  selectGameState,
  (state: GameState) => state.score
);

export const selectPatientDiseaseStage = createSelector(
  selectGameState,
  (state: GameState) => state.player?.diseaseStage
);

export const selectAccommodation = createSelector(
  selectGameState,
  (state: GameState) => state.accommodation
);

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
  (state: GameState) => state.currentQuestion
);

export const selectPatient = createSelector(
  selectGameState,
  (state: GameState) => state.player
);

export const selectGameScore = createSelector(
  selectGameState,
  (state: GameState) =>
    state.history.reduce((acc, curr) => (curr.isCorrect ? acc + 1 : acc), 0)
);

export const selectPatientDiseaseStage = createSelector(
  selectGameState,
  (state: GameState) => state.player?.diseaseStage
);

export const selectAccommodation = createSelector(
  selectGameState,
  (state: GameState) => state.accommodation
);

export const selectQuestionsToLearn = createSelector(
  selectGameState,
  (state: GameState) =>
    state.quiz?.questions.filter(
      (q) =>
        !state.learntQuestions.includes(q.id) &&
        state.history
          .filter((h) => !h.isCorrect)
          .map((h) => h.questionId)
          .filter((id) => id === q.id).length >= 2
    ) || []
);

export const selectLearntQuestions = createSelector(
  selectGameState,
  (state: GameState) =>
    state.quiz?.questions.filter((q) => state.learntQuestions.includes(q.id))
);

export const selectAvailableQuestions = createSelector(
  selectGameState,
  function (state: GameState) {
    if (!state.quiz) return [];
    return state.quiz.questions.filter((q) => {
      // if question is in history and is correct, don't show it
      if (state.history.find((h) => h.questionId === q.id && h.isCorrect))
        return false;
      // if question is in history and is incorrect, show it only if it's been learnt and has not been answered incorrectly more than 3 times
      if (state.history.find((h) => h.questionId === q.id && !h.isCorrect))
        return state.learntQuestions.includes(q.id);
      // if question has been
      // if (
      //   state.history.filter((h) => h.questionId === q.id && !h.isCorrect)
      //     .length >= 3
      // )
      //   return false;
      // if question is not in history, show it
      return true;
    });
  }
);

import { createAction, props } from '@ngrx/store';
import { Patient, Quiz } from '@webonjour/util-interface';
import { Accommodation, Prisma, QuizSession } from '@prisma/client';

export const initGame = createAction(
  '[Game Page] Init',
  props<{ quizId: number }>()
);

export const loadGameSuccess = createAction(
  '[Game/API] Load Game Success',
  props<{
    quiz: Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;
    accommodation: Accommodation[];
    quizSession: QuizSession;
  }>()
);

export const loadGameFailure = createAction(
  '[Game/API] Load Game Failure',
  props<{ error: string }>()
);

export const error = createAction('[Game Page] Error');

export const chooseAnswer = createAction(
  '[Game Page] Choose Answer',
  props<{
    isCorrect: boolean;
  }>()
);

export const nextQuestion = createAction(
  '[Game Page] Next Question',
  props<{
    skipLearning?: boolean;
  }>()
);

export const resetGame = createAction('[Game Page] Reset Game');

export const learntQuestion = createAction(
  '[Game Page] Learnt Question',
  props<{
    question: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;
  }>()
);

export const endGame = createAction('[Game Page] End Game');

export const setPatient = createAction(
  '[Game Page] Set Patient',
  props<{
    patient: Prisma.PatientGetPayload<Patient.PatientFull>;
  }>()
);

export const nextQuestionSuccess = createAction(
  '[Game Page] Next Question Success'
);

export const skipQuestion = createAction('[Game Page] Skip Question');

export const endGameSuccess = createAction('[Game Page] End Game Success');

export const chooseAnswerSuccess = createAction(
  '[Game Page] Choose Answer Success'
);

export const click = createAction('[Game Page] Click');
export const usefulClick = createAction('[Game Page] Useful Click');

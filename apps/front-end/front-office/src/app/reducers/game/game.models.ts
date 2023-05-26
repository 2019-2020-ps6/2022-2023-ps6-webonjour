import { Patient, Quiz } from '@webonjour/util-interface';
import { Accommodation, Prisma } from '@prisma/client';

/**
 * Interface for the 'Game' data
 */
export interface GameEntity {
  quiz: Prisma.QuizGetPayload<Quiz.QuizWithQuestions> | null;
  player: Prisma.PatientGetPayload<Patient.PatientFull> | null;
  currentQuestion: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues> | null;
  accommodation: Accommodation[];
  learntQuestions: number[];
  history: HistoryItem[];
  skippedQuestions: number[];
}

export interface HistoryItem {
  questionId: number;
  isCorrect: boolean;
  timeTaken: number;
}

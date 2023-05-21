import { Patient, Quiz } from '@webonjour/util-interface';
import { Prisma } from '@prisma/client';

/**
 * Interface for the 'Game' data
 */
export interface GameEntity {
  quiz: Prisma.QuizGetPayload<Quiz.QuizWithQuestions> | null;
  player: Patient.Patient | null;
  currentQuestion: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues> | null;
  accommodation: Patient.Accommodation[];
  learntQuestions: number[];
  history: HistoryItem[];
  skippedQuestions: number[];
}

export interface HistoryItem {
  questionId: number;
  isCorrect: boolean;
  timeTaken: number;
}

import { Patient } from '@webonjour/util-interface';
import { Prisma } from '@prisma/client';

/**
 * Interface for the 'Game' data
 */
export interface GameEntity {
  quiz: Prisma.QuizGetPayload<{
    include: {
      questions: {
        include: {
          answers: true;
          clues: true;
        };
      };
    };
  }> | null;
  player: Patient.Patient | null;
  currentQuestion: Prisma.QuestionGetPayload<{
    include: {
      answers: true;
      clues: true;
    };
  }> | null;
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

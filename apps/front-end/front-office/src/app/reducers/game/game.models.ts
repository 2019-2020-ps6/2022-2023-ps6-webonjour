import { Patient, Quiz } from '@webonjour/util-interface';

/**
 * Interface for the 'Game' data
 */
export interface GameEntity {
  quiz: Quiz.Quiz | null;
  player: Patient.Patient | null;
  currentQuestion: Quiz.Question | null;
  accommodation: Patient.Accommodation[];
  learntQuestions: string[];
  history: HistoryItem[];
  skippedQuestions: string[];
}

export interface HistoryItem {
  questionId: string;
  isCorrect: boolean;
  timeTaken: number;
}

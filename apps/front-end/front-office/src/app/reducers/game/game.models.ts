import { Patient, Quiz } from '@webonjour/util-interface';

/**
 * Interface for the 'Game' data
 */
export interface GameEntity {
  quiz: Quiz.Quiz | null;
  score: number;
  times: number[];
  player: Patient.Patient | null;
  wrongQuestions: Quiz.Question[];
  remainingQuestions: Quiz.Question[];
  accommodation: Patient.Accommodation[];
  remainingTries: number;
}

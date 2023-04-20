import { Patient, Quiz } from '@webonjour/util-interface';

/**
 * Interface for the 'Game' data
 */
export interface GameEntity {
  quiz: Quiz.Quiz | null;
  score: number;
  currentQuestion: number;
  times: number[];
  player: Patient.Patient | null;
}

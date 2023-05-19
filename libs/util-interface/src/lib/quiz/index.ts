export enum DiseaseStage {
  STAGE_1 = 'STAGE_1',
  STAGE_2 = 'STAGE_2',
  STAGE_3 = 'STAGE_3',
  STAGE_4 = 'STAGE_4',
  STAGE_5 = 'STAGE_5',
  STAGE_6 = 'STAGE_6',
  STAGE_7 = 'STAGE_7',
}

export enum QuestionType {
  CHOICE = 'CHOICE',
  REORDER = 'REORDER',
}

export interface Clue {
  text?: string;
  image?: string;
}

export interface Question {
  id: string;
  title: string;
  image?: string;
  answers: Answer[];
  clues: Clue[];
  type: QuestionType;
}

export interface Answer {
  text?: string;
  image?: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  imageUrl: string;
  stage: DiseaseStage;
  questions: Question[];
  isPrivate: boolean;
}

import * as Schema from './schema';

export { Schema };

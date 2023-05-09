export enum DiseaseStage {
  STAGE_1 = 1,
  STAGE_2 = 2,
  STAGE_3 = 3,
  STAGE_4 = 4,
  STAGE_5 = 5,
  STAGE_6 = 6,
  STAGE_7 = 7,
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
}

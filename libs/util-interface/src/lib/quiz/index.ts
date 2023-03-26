export enum DiseaseStage {
  STAGE_1 = 1,
  STAGE_2 = 2,
  STAGE_3 = 3,
  STAGE_4 = 4,
  STAGE_5 = 5,
  STAGE_6 = 6,
  STAGE_7 = 7,
}

export interface Clue {
  text?: string;
  image?: string;
}3

export interface Question {
  title: string;
  answers: Answer[];
  clues: Clue[];
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

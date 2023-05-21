import { DiseaseStage, Prisma, QuestionType } from '@prisma/client';
export { DiseaseStage, QuestionType } from '@prisma/client';

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

export const questionWithAnswersAndClues =
  Prisma.validator<Prisma.QuestionArgs>()({
    include: {
      answers: true,
      clues: true,
    },
  });

export type QuestionWithAnswersAndClues = typeof questionWithAnswersAndClues;

export const quizWithQuestions = Prisma.validator<Prisma.QuizArgs>()({
  include: {
    questions: questionWithAnswersAndClues,
  },
});

export type QuizWithQuestions = typeof quizWithQuestions;

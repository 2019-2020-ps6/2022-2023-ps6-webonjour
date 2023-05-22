import { Prisma } from '@prisma/client';

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

import * as Schema from './schema';

export { Schema };

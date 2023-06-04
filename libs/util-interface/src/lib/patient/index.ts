import { DiseaseStage, Prisma, Quiz, QuizSession } from '@prisma/client';

export const patientFull = Prisma.validator<Prisma.PatientArgs>()({
  include: {
    quizzes: {
      include: {
        questions: {
          include: {
            answers: true,
            clues: true,
          },
        },
      },
    },
    familyMembers: true,
    accommodations: true,
  },
});

export interface AggregatedQuestionResult {
  numberOfQuizPlayed: number;
  mostPlayedQuiz: (Prisma.PickArray<
    Prisma.QuizSessionGroupByOutputType,
    'quizId'[]
  > & { _count: { quizId: number } })[];
  lastPlayedQuiz: (QuizSession & { quiz: Quiz }) | null;
  averageScore: Prisma.GetQuizSessionAggregateType<{ _avg: { score: true } }>;
  bestQuiz: (QuizSession & { quiz: Quiz }) | null;
}

export type PatientFull = typeof patientFull;

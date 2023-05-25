import { DiseaseStage, Prisma } from '@prisma/client';

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

export type PatientFull = typeof patientFull;

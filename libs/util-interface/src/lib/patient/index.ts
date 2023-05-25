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

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profilePictureUrl: string;

  description: string;
}

export interface Patient extends Person {
  diseaseStage: DiseaseStage;
  lastQuizDate: Date;
  successRate: number;
  floor: number;
}

export interface FamilyMember extends Person {
  relation: string;
  patientId: string;
  phone?: string;
  email?: string;
}

export interface Accommodation {
  id: string;
  title: string;
}

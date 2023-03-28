import { DiseaseStage, Quiz } from '../quiz';

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
  quizzes: Quiz[];
  family: FamilyMember[];
}

export interface FamilyMember extends Person {
  relation: string;
}

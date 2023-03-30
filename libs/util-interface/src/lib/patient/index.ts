import { DiseaseStage } from '../quiz';

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

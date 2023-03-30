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
}

export interface FamilyMember extends Person {
  relation: string;
  patientId: string;
}

export interface Accommodation {
  id: string;
  title: string;
}

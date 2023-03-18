export enum DiseaseStage {
  STAGE_1 = 1,
  STAGE_2 = 2,
  STAGE_3 = 3,
  STAGE_4 = 4,
  STAGE_5 = 5,
}

export interface Quiz {
  id: string;
  title: string;
  imageUrl: string;
  stage: DiseaseStage;
}

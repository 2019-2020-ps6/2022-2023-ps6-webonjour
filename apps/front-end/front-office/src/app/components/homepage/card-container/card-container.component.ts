import { Component } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

export interface Patient {
  name: string;
  stage: Quiz.DiseaseStage;
}

@Component({
  selector: 'webonjour-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent {
  patients: Patient[] = [
    {
      name: 'Marie (stade 3)',
      stage: Quiz.DiseaseStage.STAGE_3,
    },
    {
      name: 'Jean (stade 4)',
      stage: Quiz.DiseaseStage.STAGE_4,
    },
    {
      name: 'Pierre (stade 5)',
      stage: Quiz.DiseaseStage.STAGE_5,
    },
  ];
}

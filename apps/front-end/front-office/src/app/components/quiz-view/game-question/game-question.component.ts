import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'webonjour-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent {
  diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
  question: Quiz.Question;
  image_enabled = false;

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      this.diseaseStage = params['diseaseStage'];
    });

    this.question = {
      title: 'De quelle couleur est le cheval blanc de Henri IV?',
      answers: [
        {
          text: 'Blanc',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/800px-Solid_white_bordered.svg.png',
          isCorrect: true,
        },
        {
          text: 'Noir',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png',
          isCorrect: false,
        },
        {
          text: 'Rouge',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png',
          isCorrect: false,
        },
        {
          text: 'Vert',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Solid_green.svg/2048px-Solid_green.svg.png',
          isCorrect: false,
        },
      ],
      clues: [{ text: "C'est la couleur de la neige" }],
    };
  }

  public onClick(): void {
    this.router.navigate(['/help-page']);
  }

  onImageEnable(event: boolean) {
    this.image_enabled = event;
  }
}

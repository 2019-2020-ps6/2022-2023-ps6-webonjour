import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { quizMocks } from '@webonjour/data-access-fake-backend';

@Component({
  selector: 'webonjour-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent {
  diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
  question: Quiz.Question;
  show_help = false;
  image_enabled = false;

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      this.diseaseStage = params['diseaseStage'];
    });

    this.question = quizMocks.quizList[0].questions[0];
  }

  public onClick(): void {
    this.router.navigate(['/help-page']);
  }

  onImageEnable(event: boolean) {
    this.image_enabled = event;
  }

  show_modal_help($show_modal: boolean) {
    this.show_help = $show_modal;
    const interval = setInterval(() => {
      this.show_help = false;
      clearInterval(interval);
    }, 3000);
  }
}

import { Component } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { quizMocks } from '@webonjour/data-access-fake-backend';
import { GameService } from '@webonjour/front-end/shared/common';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

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

  constructor(
    activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private store: Store,
    private actions$: Actions
  ) {
    activatedRoute.params.subscribe((params) => {
      this.diseaseStage = params['diseaseStage'];
    });

    gameService.currentQuestion.subscribe((question) => {
      this.question = question;
    });

    this.question = gameService.getCurrentQuestion();
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

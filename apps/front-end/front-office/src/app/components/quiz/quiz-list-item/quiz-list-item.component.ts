import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';
import { quizMocks } from '@webonjour/data-access-fake-backend';
import { GameService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-quiz-list-item',
  templateUrl: './quiz-list-item.component.html',
  styleUrls: ['./quiz-list-item.component.scss'],
})
export class QuizListItemComponent {
  diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
  gameService: GameService;
  activeRoute: ActivatedRoute;

  constructor(activeRoute: ActivatedRoute, gameService: GameService) {
    this.activeRoute = activeRoute;

    activeRoute.params.subscribe((params) => {
      this.diseaseStage = params['diseaseStage'];
    });

    this.gameService = gameService;
  }

  get listQuizzes() {
    return this.gameService.quizzesList;
  }
}

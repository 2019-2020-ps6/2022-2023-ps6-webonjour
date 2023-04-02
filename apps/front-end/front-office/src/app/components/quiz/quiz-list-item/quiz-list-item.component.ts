import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';
import { quizMocks } from '@webonjour/data-access-fake-backend';

@Component({
  selector: 'webonjour-quiz-list-item',
  templateUrl: './quiz-list-item.component.html',
  styleUrls: ['./quiz-list-item.component.scss'],
})
export class QuizListItemComponent {
  diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
  listQuizzes: Quiz.Quiz[];

  constructor(activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((params) => {
      this.diseaseStage = params['diseaseStage'];
    });

    this.listQuizzes = quizMocks.quizList;
  }
}

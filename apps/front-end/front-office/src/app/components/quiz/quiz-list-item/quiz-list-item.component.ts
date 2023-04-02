import { Component, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { GameService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-quiz-list-item',
  templateUrl: './quiz-list-item.component.html',
  styleUrls: ['./quiz-list-item.component.scss'],
})
export class QuizListItemComponent implements OnInit {
  diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;

  constructor(private gameService: GameService) {}

  get listQuizzes() {
    return this.gameService.quizzesList;
  }

  ngOnInit() {
    this.diseaseStage = this.gameService.patient.diseaseStage;
  }
}

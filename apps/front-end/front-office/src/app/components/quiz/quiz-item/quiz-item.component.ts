import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Router } from '@angular/router';
import { GameService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
})
export class QuizItemComponent {
  @Input() quiz: Quiz.Quiz = {
    id: '',
    title: '',
    imageUrl: '',
    stage: Quiz.DiseaseStage.STAGE_1,
    questions: [],
  };
  @Input() diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
  hover = false;

  get quizTitle(): string {
    return this.quiz.title;
  }

  get quizImageUrl(): string {
    return this.quiz.imageUrl;
  }

  constructor(private router: Router, private gameService: GameService) {
    this.quiz = this.gameService.getCurrentQuiz();
  }

  onHover(hover: boolean) {
    this.hover = hover;
  }

  onClick() {
    this.gameService.selectQuiz(this.quiz.id);
    this.router.navigate(['/quiz-answer']);
  }
}

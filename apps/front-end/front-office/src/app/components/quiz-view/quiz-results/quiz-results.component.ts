import { Component, Input } from '@angular/core';
import { GameService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent {
  @Input() canReplay = true;
  @Input() canScore = true;
  score_text = 'Bien Joué !';
  score_numeric!: string;

  constructor(private gameService: GameService) {
    this.score_numeric = this.gameService.scoreValue;
  }

  replay() {
    console.log('replay');
  }

  score() {
    console.log('score');
  }
}

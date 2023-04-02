import { Component, Input } from '@angular/core';
import { GameService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent {
  canReplay = true;
  canScore = true;

  score_text = 'Bien Joué !';
  score_numeric!: string;

  constructor(private gameService: GameService) {
    this.score_numeric = this.gameService.scoreValue;

    this.canReplay =
      this.gameService.accomodation.filter((accommodation) => {
        return accommodation.id === '6';
      }).length > 0;

    this.canScore =
      this.gameService.accomodation.filter((accommodation) => {
        return accommodation.id === '1';
      }).length > 0;
  }

  replay() {
    console.log('replay');
  }

  score() {
    console.log('score');
  }
}

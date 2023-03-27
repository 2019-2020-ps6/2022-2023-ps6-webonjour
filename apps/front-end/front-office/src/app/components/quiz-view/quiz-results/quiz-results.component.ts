import {Component, Input} from '@angular/core';

@Component({
  selector: 'webonjour-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent {
  @Input() canReplay = true;
  score_text = 'Bien Joué !';

  replay() {
    console.log('replay');
  }

  score() {
    console.log('score');
  }
}

import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
@Component({
  selector: 'webonjour-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss'],
})
export class GameAnswerComponent {
  @Input() answer: Quiz.Answer = { text: '', isCorrect: false };
  hover = false;
  clicked = false;
  disabled = false;

  onClick() {
    if (this.disabled) {
      return;
    }

    this.clicked = true;
  }

  onHover(hover: boolean) {
    if (this.disabled) {
      return;
    }

    this.hover = hover;
  }
}

import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onClick() {
    if (this.disabled) {
      return;
    }

    this.clicked = true;
    //add the route with this.router.navigate(['route']);
  }

  onHover(hover: boolean) {
    if (this.disabled) {
      return;
    }

    this.hover = hover;
  }
}

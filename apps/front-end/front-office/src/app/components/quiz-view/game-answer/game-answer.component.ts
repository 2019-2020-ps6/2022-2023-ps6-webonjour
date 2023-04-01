import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'webonjour-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss'],
})
export class GameAnswerComponent {
  @Input() answer: Quiz.Answer = { text: '', isCorrect: false };
  @Output() show_modal_help = new EventEmitter<boolean>();
  hover = false;
  clicked = false;
  disabled = false;

  constructor(private router: Router) {}

  onClick() {
    if (this.disabled) {
      return;
    }

    this.clicked = true;
    if (this.answer.isCorrect) {
      this.router.navigate(['/result']);
    } else {
      this.disabled = true;
      this.show_modal_help.emit(true);
    }
  }

  onHover(hover: boolean) {
    if (this.disabled) {
      return;
    }

    this.hover = hover;
  }
}

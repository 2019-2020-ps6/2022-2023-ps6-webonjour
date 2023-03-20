import { Component, Input } from '@angular/core';
import {Answer} from "../../../models/answer.model";

@Component({
  selector: 'webonjour-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss'],
})
export class GameAnswerComponent {
  @Input() answer!: Answer;
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

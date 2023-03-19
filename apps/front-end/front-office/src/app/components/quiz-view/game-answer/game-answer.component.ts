import {Component, Input} from '@angular/core';

@Component({
  selector: 'webonjour-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss'],
})
export class GameAnswerComponent {
  @Input() answer!: string;
  hover = false;
  clicked = false;

  constructor() {
    this.answer = 'Hello World';
  }
}

import { Component } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent {
  question: Quiz.Question;

  constructor() {
    this.question = {
      title: 'De quelle couleur est le cheval blanc de Henri IV?',
      answers: [
        { value: 'Blanc', isCorrect: true },
        { value: 'Noir', isCorrect: false },
        { value: 'Rouge', isCorrect: false },
        { value: 'Vert', isCorrect: false },
      ],
    };
  }
}

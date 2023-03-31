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
        { text: 'Blanc', isCorrect: true },
        { text: 'Noir', isCorrect: false },
        { text: 'Rouge', isCorrect: false },
        { text: 'Vert', isCorrect: false },
      ],
      clues: [{ text: "C'est une couleur" }, { text: "C'est une couleur" }],
    };
  }
}

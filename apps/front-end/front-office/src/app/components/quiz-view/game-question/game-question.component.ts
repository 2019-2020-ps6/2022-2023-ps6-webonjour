import { Component } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Answer } from '../../../models/answer.model';

@Component({
  selector: 'webonjour-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent {
  question: Question;

  constructor() {
    this.question = new Question(
      'De quelle couleur est le cheval blanc de Henri IV?',
      ['Blanc', 'Noir', 'Rouge', 'Vert'].map(
        (answer) => new Answer(answer, answer === 'Blanc')
      )
    );
  }
}

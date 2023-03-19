import { Component } from '@angular/core';

@Component({
  selector: 'webonjour-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent {
  answers: string[] = ["Blanc", "Noir", "Rouge", "Vert"];
  title = "De quelle couleur est le cheval blanc de Henri IV?";
}

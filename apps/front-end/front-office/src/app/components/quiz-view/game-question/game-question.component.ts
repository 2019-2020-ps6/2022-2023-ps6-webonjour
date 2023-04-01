import { Component } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'webonjour-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent {
  question: Quiz.Question;
  show_help = false;

  constructor(private router: Router) {
    this.question = {
      title: 'De quelle couleur est le cheval blanc de Henri IV?',
      answers: [
        { text: 'Blanc', isCorrect: true },
        { text: 'Noir', isCorrect: false },
        { text: 'Rouge', isCorrect: false },
        { text: 'Vert', isCorrect: false },
      ],
      clues: [{ text: "C'est la couleur de la neige" }],
    };
  }

  public onClick(): void {
    this.router.navigate(['/help-page']);
  }

  show_modal_help($event: boolean) {
    this.show_help = $event.valueOf();
    const interval = setInterval(() => {
      this.show_help = false;
      clearInterval(interval);
    }, 3000);
  }
}

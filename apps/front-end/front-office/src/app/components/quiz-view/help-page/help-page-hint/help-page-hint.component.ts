import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { GameService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-help-page-hint',
  templateUrl: './help-page-hint.component.html',
  styleUrls: ['./help-page-hint.component.scss'],
})
export class HelpPageHintComponent implements OnInit {
  @Input() question!: Quiz.Question;
  protected readonly Math = Math;
  randomClue!: Quiz.Clue;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.question = this.gameService.getCurrentQuestion();
    this.randomClue =
      this.question.clues[
        Math.floor(Math.random() * this.question.clues.length)
      ];

    this.gameService.currentQuestion.subscribe((question) => {
      this.question = question;
      this.randomClue =
        this.question.clues[
          Math.floor(Math.random() * this.question.clues.length)
        ];
    });
  }
}

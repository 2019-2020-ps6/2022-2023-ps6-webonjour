import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { GameService } from '@webonjour/front-end/shared/common';

@Component({
  selector: 'webonjour-help-popup',
  templateUrl: './help-popup.component.html',
  styleUrls: ['./help-popup.component.scss'],
})
export class HelpPopupComponent implements OnInit {
  @Input() question!: Quiz.Question;
  @Input() show_help = false;
  protected readonly Math = Math;
  randomClue!: Quiz.Clue;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.randomClue =
      this.question.clues[
        Math.floor(Math.random() * this.question.clues.length)
      ];
  }
}

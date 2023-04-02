import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { quizMocks } from '@webonjour/data-access-fake-backend';

@Component({
  selector: 'webonjour-help-page-hint',
  templateUrl: './help-page-hint.component.html',
  styleUrls: ['./help-page-hint.component.scss'],
})
export class HelpPageHintComponent implements OnInit {
  @Input() question: Quiz.Question = quizMocks.quizList[0].questions[0];
  protected readonly Math = Math;
  randomClue!: Quiz.Clue;

  ngOnInit() {
    this.randomClue =
      this.question.clues[
        Math.floor(Math.random() * this.question.clues.length)
      ];
  }
}

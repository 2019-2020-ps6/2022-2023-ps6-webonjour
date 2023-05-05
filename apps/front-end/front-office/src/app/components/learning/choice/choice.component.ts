import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements OnInit {
  @Input() question!: Quiz.Question;
  rightAnswers!: Quiz.Answer[];

  ngOnInit(): void {
    this.rightAnswers = this.question.answers.filter((answer) => {
      return answer.isCorrect;
    });
  }
}

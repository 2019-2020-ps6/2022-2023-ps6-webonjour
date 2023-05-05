import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent {
  @Input() question!: Quiz.Question;
  rightAnswers: Quiz.Answer[] = this.question.answers.filter(
    (answer) => answer.isCorrect
  );
}

import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-answer',
  templateUrl: './question-detail-answer.component.html',
})
export class QuestionDetailAnswerComponent {
  @Input() answer!: Quiz.Answer;
}

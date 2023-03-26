import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-answers',
  templateUrl: './question-detail-answers.component.html',
  styleUrls: ['./question-detail-answers.component.scss'],
})
export class QuestionDetailAnswersComponent {
  @Input() question!: Quiz.Question;

  onAddAnswer() {
    this.question.answers.push({
      isCorrect: false,
    });
  }
}

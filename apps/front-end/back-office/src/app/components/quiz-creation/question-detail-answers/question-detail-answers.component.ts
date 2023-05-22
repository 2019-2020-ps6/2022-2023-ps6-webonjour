import { Component, Input } from '@angular/core';
import { Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-answers',
  templateUrl: './question-detail-answers.component.html',
  styleUrls: ['./question-detail-answers.component.scss'],
})
export class QuestionDetailAnswersComponent {
  @Input()
  question!: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

  onAddAnswer() {
    this.question.answers.push({
      id: -1,
      text: null,
      isCorrect: false,
      image: null,
      questionId: 0,
    });
  }
}

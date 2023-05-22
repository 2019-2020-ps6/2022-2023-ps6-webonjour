import { Component, Input } from '@angular/core';
import { Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-clues',
  templateUrl: './question-detail-clues.component.html',
  styleUrls: ['./question-detail-clues.component.scss'],
})
export class QuestionDetailCluesComponent {
  @Input()
  question!: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

  onAddClue() {
    this.question.clues.push({
      text: '',
      image: '',
      id: 0,
      questionId: 0,
    });
  }
}

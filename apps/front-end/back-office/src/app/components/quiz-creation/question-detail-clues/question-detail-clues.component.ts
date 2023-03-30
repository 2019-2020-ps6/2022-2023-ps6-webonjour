import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-clues',
  templateUrl: './question-detail-clues.component.html',
  styleUrls: ['./question-detail-clues.component.scss'],
})
export class QuestionDetailCluesComponent {
  @Input() question!: Quiz.Question;

  onAddClue() {
    this.question.clues.push({
      text: '',
      image: '',
    });
  }
}

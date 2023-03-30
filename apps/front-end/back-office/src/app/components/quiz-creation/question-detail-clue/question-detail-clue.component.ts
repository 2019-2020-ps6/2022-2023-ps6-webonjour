import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-clue',
  templateUrl: './question-detail-clue.component.html',
  styleUrls: ['./question-detail-clue.component.scss'],
})
export class QuestionDetailClueComponent {
  @Input() clue!: Quiz.Clue;
}

import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-question-detail-main',
  templateUrl: './question-detail-main.component.html',
  styleUrls: ['./question-detail-main.component.scss'],
})
export class QuestionDetailMainComponent {
  @Input() question!: Quiz.Question;
}

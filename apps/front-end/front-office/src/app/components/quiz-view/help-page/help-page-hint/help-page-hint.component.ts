import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { quizMocks } from '@webonjour/data-access-fake-backend';

@Component({
  selector: 'webonjour-help-page-hint',
  templateUrl: './help-page-hint.component.html',
  styleUrls: ['./help-page-hint.component.scss'],
})
export class HelpPageHintComponent {
  @Input() question: Quiz.Question = quizMocks.quizList[0].questions[0];
  protected readonly Math = Math;
}

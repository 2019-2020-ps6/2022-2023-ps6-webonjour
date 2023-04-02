import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { quizMocks } from '@webonjour/data-access-fake-backend';

@Component({
  selector: 'webonjour-help-popup',
  templateUrl: './help-popup.component.html',
  styleUrls: ['./help-popup.component.scss'],
})
export class HelpPopupComponent {
  @Input() question: Quiz.Question = quizMocks.quizList[0].questions[0];
  @Input() show_help = false;
  protected readonly Math = Math;
}

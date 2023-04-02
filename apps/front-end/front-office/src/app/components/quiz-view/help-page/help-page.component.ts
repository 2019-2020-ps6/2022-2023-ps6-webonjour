import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { quizMocks } from '@webonjour/data-access-fake-backend';

@Component({
  selector: 'webonjour-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent {
  @Input() question: Quiz.Question = quizMocks.quizList[0].questions[0];
  @Input() stade: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
}

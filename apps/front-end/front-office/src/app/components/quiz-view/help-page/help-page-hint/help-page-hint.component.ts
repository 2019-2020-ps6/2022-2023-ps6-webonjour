import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-help-page-hint',
  templateUrl: './help-page-hint.component.html',
  styleUrls: ['./help-page-hint.component.scss'],
})
export class HelpPageHintComponent {
  @Input() question!: Quiz.Question;
  protected readonly Math = Math;
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-help-page-return',
  templateUrl: './help-page-return.component.html',
  styleUrls: ['./help-page-return.component.scss'],
})
export class HelpPageReturnComponent {
  @Input() diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectPatientDiseaseStage } from '../../../reducers/game/game.selectors';
import * as GameActions from '../../../reducers/game/game.actions';
import { Quiz } from '@webonjour/util-interface';
import { Input } from '@angular/core';

@Component({
  selector: 'webonjour-skip-button',
  templateUrl: './skip-button.component.html',
  styleUrls: ['./skip-button.component.scss'],
})
export class SkipButtonComponent {
  @Input() diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
  @Input() answer: Quiz.Answer = { text: '', isCorrect: false };
  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.select(selectPatientDiseaseStage).subscribe((diseaseStage) => {
      this.diseaseStage = diseaseStage
        ? diseaseStage
        : Quiz.DiseaseStage.STAGE_3;
    });
  }
  onClick() {
    this.store.dispatch(GameActions.nextQuestion());
  }
}

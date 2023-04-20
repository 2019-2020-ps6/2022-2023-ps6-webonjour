import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Store } from '@ngrx/store';
import { selectPatientDiseaseStage } from '../../../../reducers/game/game.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'webonjour-help-page-return',
  templateUrl: './help-page-return.component.html',
  styleUrls: ['./help-page-return.component.scss'],
})
export class HelpPageReturnComponent implements OnDestroy, OnInit {
  diseaseStage!: Quiz.DiseaseStage;
  private ngDestroyed$: Subject<0> = new Subject();

  ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  ngOnInit() {
    this.store
      .select(selectPatientDiseaseStage)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((diseaseStage) => {
        this.diseaseStage = diseaseStage
          ? diseaseStage
          : Quiz.DiseaseStage.STAGE_1;
      });
  }

  constructor(private store: Store) {}
}

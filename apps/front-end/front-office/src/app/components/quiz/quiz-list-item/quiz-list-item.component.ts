import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectPatient,
  selectPatientDiseaseStage,
} from '../../../reducers/game/game.selectors';
import { Quiz } from '@webonjour/util-interface';
import { PatientService } from '@webonjour/front-end/shared/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'webonjour-quiz-list-item',
  templateUrl: './quiz-list-item.component.html',
  styleUrls: ['./quiz-list-item.component.scss'],
})
export class QuizListItemComponent implements OnInit, OnDestroy {
  diseaseStage!: Quiz.DiseaseStage;
  listQuizzes!: Quiz.Quiz[];
  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(private store: Store, private patientService: PatientService) {}

  ngOnInit(): void {
    this.store
      .select(selectPatientDiseaseStage)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((diseaseStage) => {
        this.diseaseStage = diseaseStage
          ? diseaseStage
          : Quiz.DiseaseStage.STAGE_1;
        console.log('diseaseStage', diseaseStage);
      });

    this.store
      .select(selectPatient)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((patient) => {
        if (patient) {
          this.patientService
            .getPatientQuiz(patient.id)
            .subscribe((quizzes) => {
              this.listQuizzes = quizzes.data;
            });
        }
      });
  }
}

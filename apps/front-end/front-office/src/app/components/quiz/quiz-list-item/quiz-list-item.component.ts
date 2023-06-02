import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPatient } from '../../../reducers/game/game.selectors';
import { PatientService } from '@webonjour/front-end/shared/common';
import { Subject, takeUntil } from 'rxjs';
import { Prisma } from '@prisma/client';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-quiz-list-item',
  templateUrl: './quiz-list-item.component.html',
  styleUrls: ['./quiz-list-item.component.scss'],
})
export class QuizListItemComponent implements OnInit, OnDestroy {
  listQuizzes!: Prisma.QuizGetPayload<Quiz.QuizWithQuestions>[];
  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(private store: Store, private patientService: PatientService) {}

  ngOnInit(): void {
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

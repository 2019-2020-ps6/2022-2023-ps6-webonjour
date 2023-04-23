import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  selectAccommodation,
  selectGameCurrentQuestion,
  selectPatientDiseaseStage,
} from '../../../reducers/game/game.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'webonjour-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent implements OnDestroy, OnInit {
  diseaseStage!: Quiz.DiseaseStage;
  question!: Quiz.Question;
  show_help = false;
  image_enabled = false;

  public ngDestroyed$ = new Subject();
  private maxTries!: number;

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectGameCurrentQuestion)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((question) => {
        if (question) {
          this.question = question;
        }
      });

    this.store
      .select(selectAccommodation)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((accommodation) => {
        accommodation.filter((accommodation) => {
          accommodation.title === 'Peut répondre deux fois à la même question';
        }).length > 0
          ? (this.maxTries = 2)
          : (this.maxTries = 1);
      });

    this.store
      .select(selectPatientDiseaseStage)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((diseaseStage) => {
        this.diseaseStage = diseaseStage
          ? diseaseStage
          : Quiz.DiseaseStage.STAGE_1;
      });
  }

  onImageEnable(event: boolean) {
    this.image_enabled = event;
  }

  show_modal_help($show_modal: boolean) {
    this.show_help = $show_modal;
    const interval = setInterval(() => {
      this.show_help = false;
      clearInterval(interval);
    }, 3000);
  }
}

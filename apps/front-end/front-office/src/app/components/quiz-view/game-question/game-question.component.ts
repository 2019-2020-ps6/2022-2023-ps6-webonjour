import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectAccommodation,
  selectGameCurrentQuestion,
  selectPatientDiseaseStage,
} from '../../../reducers/game/game.selectors';
import { Subject, takeUntil } from 'rxjs';
import * as GameActions from '../../../reducers/game/game.actions';

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
  colors = new Map([
    ['bleu', '#3498db'],
    ['violet', '#9b59b6'],
    ['jaune', '#f1c40f'],
    ['vert', '#2ecc71'],
  ]);
  public ngDestroyed$ = new Subject();
  private maxTries!: number;
  protected readonly document = document;
  protected readonly Array = Array;

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

  onSelectAnswer(answer: Quiz.Answer, index: number) {
    const question = document.querySelector('#answer-' + index);

    if (!question || question.classList.contains('disabled')) {
      return;
    }

    question.classList.add('selected');

    this.store.dispatch(
      GameActions.chooseAnswer({ isCorrect: answer.isCorrect })
    );

    if (!answer.isCorrect) {
      this.handleAnswerError(question);
    }

    this.store.dispatch(GameActions.nextQuestion());
  }

  handleAnswerError(question: Element) {
    this.maxTries--;

    if (this.maxTries <= 0) {
      question.classList.add('disabled');
    }

    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_3) {
      question.classList.add('disabled');
    }

    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_4) {
      this.show_modal_help(true);
    }

    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_5) {
      this.image_enabled = true;
    }
  }

  show_modal_help($show_modal: boolean) {
    this.show_help = $show_modal;
    const interval = setInterval(() => {
      this.show_help = false;
      clearInterval(interval);
    }, 3000);
  }
}

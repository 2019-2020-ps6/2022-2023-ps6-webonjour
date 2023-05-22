import { Component, OnDestroy, OnInit } from '@angular/core';
import { Patient, Quiz } from '@webonjour/util-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { TtsService } from '@webonjour/front-end/shared/common';
import {
  selectAccommodation,
  selectGameCurrentQuestion,
  selectPatientDiseaseStage,
} from '../../../reducers/game/game.selectors';
import { Subject, takeUntil } from 'rxjs';
import * as GameActions from '../../../reducers/game/game.actions';
import { Answer, DiseaseStage } from '@prisma/client';
import { Prisma } from '@prisma/client';
@Component({
  selector: 'webonjour-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss'],
})
export class GameQuestionComponent implements OnDestroy, OnInit {
  diseaseStage!: DiseaseStage;
  question!: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;
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
  private tries = 0;
  private accomodations!: Patient.Accommodation[];

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private actions$: Actions,
    private tts: TtsService
  ) {}

  ttsQuestion(
    question: Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>
  ) {
    // we have to concatenate the question title and the answers text
    // because the TTS API only accepts one string
    let text = question.title;

    const colors = Array.from(this.colors.keys());
    for (let i = 0; i < question.answers.length; i++) {
      const answer = question.answers[i];
      if (answer.text) text += `\nRéponse ${colors[i]}: ${answer.text}.`;
    }

    this.tts.sayTTS(text);
  }

  ngOnInit(): void {
    this.tries = 0;
    this.store
      .select(selectGameCurrentQuestion)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((question) => {
        if (question) {
          this.question = question;
          this.ttsQuestion(question);
        }
      });

    this.store
      .select(selectAccommodation)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((accomodations) => {
        this.accomodations = accomodations;
        if (
          accomodations.filter(function (accomodations) {
            return (
              accomodations.title ===
              'Peut répondre deux fois à la même question'
            );
          }).length > 0
        ) {
          this.maxTries = 2;
        } else {
          this.maxTries = 1;
        }
      });

    this.store
      .select(selectPatientDiseaseStage)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((diseaseStage) => {
        this.diseaseStage = diseaseStage ? diseaseStage : DiseaseStage.STAGE_1;
      });
    this.actions$
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((action: Action) => {
        if (action.type === GameActions.nextQuestion.type) {
          this.reset();
        }
      });
  }

  onSelectAnswer(answer: Answer, index: number) {
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
    } else {
      this.store.dispatch(
        GameActions.nextQuestion({
          skipLearning: true,
        })
      );
    }
    if (this.tries >= this.maxTries) {
      this.store.dispatch(GameActions.nextQuestion({}));
    }
  }

  handleAnswerError(question: Element) {
    this.tries++;

    if (this.tries >= this.maxTries) {
      question.classList.add('disabled');
    }

    if (this.diseaseStage >= DiseaseStage.STAGE_3) {
      question.classList.add('disabled');
    }

    if (this.diseaseStage >= DiseaseStage.STAGE_4) {
      this.show_modal_help(true);
    }

    if (
      this.accomodations.some(
        (a) => a.title === "Afficher les images en cas d'échec"
      )
    ) {
      if (this.question.answers.some((a) => a.image)) {
        this.image_enabled = true;
      }
    }
  }

  show_modal_help($show_modal: boolean) {
    this.show_help = $show_modal;
    const interval = setInterval(() => {
      this.show_help = false;
      clearInterval(interval);
    }, 3000);
  }

  private reset() {
    this.tries = 0;
    this.show_help = false;
    this.image_enabled = false;
    const answers = document.querySelectorAll('[id^=answer-]');
    answers.forEach((answer) => {
      answer.classList.remove('selected');
      answer.classList.remove('disabled');
    });

    this.store
      .select(selectGameCurrentQuestion)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((question) => {
        if (
          question &&
          question.answers.length > 0 &&
          !question.answers[0].text
        ) {
          this.image_enabled = true;
        }
      });
  }

  skip() {
    this.store.dispatch(GameActions.skipQuestion());
  }
}

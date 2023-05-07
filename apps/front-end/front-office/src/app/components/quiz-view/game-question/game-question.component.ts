import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TtsService } from '@webonjour/front-end/shared/common';

import {
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
  colors = new Map([
    ['bleu', '#3498db'],
    ['violet', '#9b59b6'],
    ['jaune', '#f1c40f'],
    ['vert', '#2ecc71'],
  ]);
  public ngDestroyed$ = new Subject();
  protected readonly Array = Array;

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

  ttsQuestion(question: Quiz.Question) {
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

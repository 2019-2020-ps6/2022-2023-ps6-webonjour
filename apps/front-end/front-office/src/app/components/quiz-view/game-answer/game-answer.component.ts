import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPatientDiseaseStage } from '../../../reducers/game/game.selectors';
import * as GameActions from '../../../reducers/game/game.actions';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'webonjour-game-answer',
  templateUrl: './game-answer.component.html',
  styleUrls: ['./game-answer.component.scss'],
})
export class GameAnswerComponent implements OnInit, OnDestroy {
  @Input() diseaseStage: Quiz.DiseaseStage = Quiz.DiseaseStage.STAGE_3;
  @Input() answer: Quiz.Answer = { text: '', isCorrect: false };
  @Input() color: string = '#00fc05';
  @Input() img_enabled = false;
  @Output() displayImageEvent = new EventEmitter<boolean>();
  @Output() show_modal_help = new EventEmitter<boolean>();
  hover = false;
  clicked = false;
  disabled = false;
  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(private router: Router, private store: Store) {}

  onClick() {
    if (this.disabled) {
      return;
    }

    this.clicked = true;

    this.store.dispatch(
      GameActions.chooseAnswer({ isCorrect: this.answer.isCorrect })
    );

    if (!this.answer.isCorrect) {
      this.handleAnswerError();
    }
  }

  onHover(hover: boolean) {
    if (this.disabled) {
      return;
    }

    this.hover = hover;
  }

  handleAnswerError() {
    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_3) {
      this.disabled = true;
    }

    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_4) {
      this.show_modal_help.emit(true);
    }

    if (this.diseaseStage >= Quiz.DiseaseStage.STAGE_5) {
      this.displayImageEvent.emit(true);
    }
  }

  setImageEnabled(enabled: boolean) {
    this.img_enabled = enabled;
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

    if (!this.answer.text) {
      this.displayImageEvent.emit(true);
    }
  }
}

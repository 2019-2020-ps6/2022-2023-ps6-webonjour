import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAccommodation,
  selectGameScore,
  selectGameState,
  selectPatient,
} from '../../../reducers/game/game.selectors';
import { Subject, takeUntil } from 'rxjs';
import { PatientService } from '@webonjour/front-end/shared/common';
import { GameState } from '../../../reducers/game/game.reducer';

@Component({
  selector: 'webonjour-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnDestroy, OnInit {
  canReplay = true;
  canScore = true;

  score_text = 'Bien Joué !';
  score_numeric!: number;
  state!: GameState;

  public ngDestroyed$ = new Subject();

  constructor(private store: Store, private patientService: PatientService) {}

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  ngOnInit(): void {
    this.store
      .select(selectGameScore)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((score) => {
        this.score_numeric = score;
      });

    this.store
      .select(selectGameState)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((state) => {
        this.state = state;
      });

    this.store
      .select(selectAccommodation)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((accommodation) => {
        this.canReplay =
          accommodation.filter((accommodation) => {
            return accommodation.title === 'Peut recommencer le quiz';
          }).length > 0;

        this.canScore =
          accommodation.filter((accommodation) => {
            return accommodation.title === 'Affiche le score à la fin du quiz';
          }).length > 0;
      });
  }

  replay() {
    console.log('replay');
  }

  score() {
    console.log('score');
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Quiz } from '@webonjour/util-interface';
import { selectGame } from '../../../../reducers/game/game.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'webonjour-help-page-header',
  templateUrl: './help-page-header.component.html',
  styleUrls: ['./help-page-header.component.scss'],
})
export class HelpPageHeaderComponent implements OnDestroy, OnInit {
  quiz!: Quiz.Quiz;
  currentQuizQuestion!: number;
  private ngDestroyed$: Subject<0> = new Subject();

  ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectGame)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((gameState) => {
        if (gameState.quiz) {
          this.quiz = gameState.quiz;
          this.currentQuizQuestion = gameState.currentQuestion + 1;
        }
      });
  }
}

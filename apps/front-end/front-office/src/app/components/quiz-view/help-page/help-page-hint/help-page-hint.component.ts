import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectGameCurrentQuestion } from '../../../../reducers/game/game.selectors';

@Component({
  selector: 'webonjour-help-page-hint',
  templateUrl: './help-page-hint.component.html',
  styleUrls: ['./help-page-hint.component.scss'],
})
export class HelpPageHintComponent implements OnInit, OnDestroy {
  protected readonly Math = Math;
  randomClue!: Quiz.Clue;

  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectGameCurrentQuestion)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((question) => {
        if (question) {
          this.randomClue =
            question.clues[Math.floor(Math.random() * question.clues.length)];
        }
      });
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectGameCurrentQuestion } from '../../../reducers/game/game.selectors';

@Component({
  selector: 'webonjour-help-popup',
  templateUrl: './help-popup.component.html',
  styleUrls: ['./help-popup.component.scss'],
})
export class HelpPopupComponent implements OnInit, OnDestroy {
  @Input() question!: Quiz.Question;
  @Input() show_help = false;
  protected readonly Math = Math;
  randomClue!: Quiz.Clue;
  array = new Uint32Array(1);

  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectGameCurrentQuestion)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((question) => {
        if (question) {
          this.question = question;
          window.crypto.getRandomValues(this.array);
          this.randomClue =
            this.question.clues[
              Math.floor(this.array[0] % this.question.clues.length)
            ];
        }
      });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Quiz } from '@webonjour/util-interface';
import { selectGame } from '../../../reducers/game/game.selectors';

@Component({
  selector: 'webonjour-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent implements OnInit, OnDestroy {
  randomClue!: Quiz.Clue;
  quiz!: Quiz.Quiz;
  currentQuizQuestion!: number;

  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
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

          const textClues = gameState.quiz.questions[
            gameState.currentQuestion
          ].clues.filter((clue) => clue.text);

          if (textClues.length > 0) {
            this.randomClue =
              textClues[Math.floor(Math.random() * textClues.length)];
          } else {
            this.randomClue = {
              text: 'No clue available',
            };
          }
        }
      });
  }
}

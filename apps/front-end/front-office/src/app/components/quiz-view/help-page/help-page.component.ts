import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Quiz } from '@webonjour/util-interface';
import {
  selectGame,
  selectGameCurrentQuestion,
} from '../../../reducers/game/game.selectors';

@Component({
  selector: 'webonjour-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent implements OnInit, OnDestroy {
  randomClue!: Quiz.Clue;
  quiz!: Quiz.Quiz;
  question!: Quiz.Question;
  currentQuizQuestion!: number;
  array = new Uint32Array(1);

  public ngDestroyed$ = new Subject();
  quizRoute!: string;

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
          this.currentQuizQuestion = gameState.history.length;

          const textClues = gameState.currentQuestion?.clues.filter(
            (clue) => clue.text
          );

          if (textClues && textClues.length > 0) {
            window.crypto.getRandomValues(this.array);
            this.randomClue =
              textClues[Math.floor(this.array[0] % textClues.length)]; // Please note that Math.random() will produce a number between 0 and 1, but never 1.
          } else {
            this.randomClue = {
              text: 'No clue available',
            };
          }
        }
      });

    this.store
      .select(selectGameCurrentQuestion)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((question) => {
        if (question) {
          this.quizRoute =
            question.type == Quiz.QuestionType.CHOICE
              ? '/quiz-answer'
              : '/drag-and-drop';
        }
      });
  }
}

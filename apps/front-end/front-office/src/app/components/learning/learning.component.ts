import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Quiz } from '@webonjour/util-interface';
import { Subject, takeUntil } from 'rxjs';
import { selectGameState } from '../../reducers/game/game.selectors';
import { OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'webonjour-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss'],
})
export class LearningComponent implements OnDestroy, OnInit {
  QuestionType = Quiz.QuestionType;
  question!: Quiz.Question;

  public ngDestroyed$ = new Subject();

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectGameState)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((state) => {
        if (state) {
          window.alert(
            'game state present, question is ' + state.wrongQuestions[0].title
          );
          this.question = state.wrongQuestions[0];
        } else {
          window.alert('No game state');
          throw new Error('No game state');
        }
      });
  }
}

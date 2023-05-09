import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as GameActions from '../../reducers/game/game.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectGameCurrentQuestion } from '../../reducers/game/game.selectors';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit, OnDestroy {
  question!: Quiz.Question;
  elements!: string[];
  answer!: string[];
  desiredResult!: string[];
  showModal = false;
  showInvalid = false;

  public ngDestroyed$ = new Subject();
  private modalTimer!: number;

  public ngOnDestroy() {
    this.ngDestroyed$.next(0);
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectGameCurrentQuestion)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((question) => {
        if (question) {
          this.showInvalid = false;
          this.question = question;
          this.desiredResult = question.answers.map(
            (answer) => answer.text || ''
          );
          this.elements = this.desiredResult.slice(); // deep copy
          this.answer = [];
          this.shuffle();
        }
      });
  }

  shuffle() {
    this.elements.sort(() => Math.random() - 0.5);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // move item in the same list
      this.showInvalid = false;
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // transfer item from one list to another
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  validateOrder() {
    const isValidLength = this.answer.length === this.desiredResult.length;
    const isValidOrder =
      isValidLength &&
      this.answer.every(
        (element, index) => element === this.desiredResult[index]
      );

    if (isValidOrder) {
      this.showModal = true;
      this.modalTimer = setTimeout(() => {
        this.exitModal();
      }, 5000);
    } else {
      this.showInvalid = true;
      // This is here and not above because we want to dispatch the message after enabling showInvalid DO NOT MOVE
      this.store.dispatch(GameActions.chooseAnswer({ isCorrect: false }));
    }
  }

  isValidOrder(element: string, index: number) {
    return this.showInvalid && element !== this.desiredResult[index];
  }

  exitModal() {
    this.showModal = false;
    clearTimeout(this.modalTimer);
    this.store.dispatch(GameActions.chooseAnswer({ isCorrect: true }));
  }
}

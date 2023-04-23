import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as GameActions from '../../reducers/game/game.actions';
import { show } from 'nx/src/command-line/show';

@Component({
  selector: 'webonjour-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {
  elements: string[] = ['Action 1', 'Action 2', 'Action 3', 'Action 4'];
  desiredResult: string[] = ['Action 1', 'Action 2', 'Action 3', 'Action 4'];
  showModal = false;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.shuffle();
  }

  shuffle() {
    this.elements.sort(() => Math.random() - 0.5);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // move item in the same list
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
    const isValidOrder = this.elements.every(
      (element, index) => element === this.desiredResult[index]
    );

    if (isValidOrder) {
      this.showModal = true;
      setTimeout(() => {
        this.showModal = false;
        this.store.dispatch(GameActions.chooseAnswer({ isCorrect: true }));
      }, 5000);
    } else {
      console.log('Order is not valid');
    }
  }
}

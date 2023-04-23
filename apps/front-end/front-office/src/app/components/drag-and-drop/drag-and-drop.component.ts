import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as GameActions from '../../reducers/game/game.actions';

interface Action {
  name: string;
  order: number;
}

@Component({
  selector: 'webonjour-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {
  @ViewChild('successDialog') successDialog!: TemplateRef<unknown>;

  actions: Action[] = [
    { name: 'Action 1', order: 1 },
    { name: 'Action 2', order: 2 },
    { name: 'Action 3', order: 3 },
    { name: 'Action 4', order: 4 },
  ];
  sortedActions: Action[] = [{ name: 'Action 5', order: 5 }];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.shuffle();
  }

  shuffle() {
    this.actions.sort(() => Math.random() - 0.5);
  }

  onDrop(event: CdkDragDrop<Action[]>) {
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
    this.validateOrder();
  }

  validateOrder() {
    const isValidOrder = this.sortedActions.every(
      (action, index) => action.order === index + 1
    );
    if (isValidOrder) {
      const dialogRef = this.dialog.open(this.successDialog);
      // attend 5 secondes avant de rediriger vers la prochaine question
      setTimeout(() => {
        dialogRef.close();
        this.store.dispatch(GameActions.chooseAnswer({ isCorrect: true }));
      }, 5000);
    } else {
      console.log('Order is not valid');
    }
  }
}

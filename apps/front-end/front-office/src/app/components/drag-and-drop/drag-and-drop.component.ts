import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Action {
  name: string;
  order: number;
}

@Component({
  selector: 'webonjour-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent {
  actions: Action[] = [
    { name: 'Action 1', order: 1 },
    { name: 'Action 2', order: 2 },
    { name: 'Action 3', order: 3 },
    { name: 'Action 4', order: 4 },
  ];
  sortedActions: Action[] = [
    { name: 'Action 5', order: 5 },
    { name: 'Action 6', order: 6 },
    { name: 'Action 7', order: 7 },
  ];

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
  }
}

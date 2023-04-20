import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'webonjour-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent {
  actions = [
    { name: 'action1', order: 1 },
    { name: 'action2', order: 2 },
    { name: 'action3', order: 3 },
    { name: 'action4', order: 4 },
  ];
}

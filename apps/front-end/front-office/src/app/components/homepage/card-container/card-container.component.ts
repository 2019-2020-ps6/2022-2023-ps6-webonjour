import { Component } from '@angular/core';

@Component({
  selector: 'webonjour-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent {
  users = ['Marie', 'Jean', 'Pierre'];
}

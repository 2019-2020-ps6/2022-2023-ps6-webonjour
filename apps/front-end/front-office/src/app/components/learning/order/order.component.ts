import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

@Component({
  selector: 'webonjour-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() question!: Quiz.Question;
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

enum CardColor {
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
  dark = 'dark',
}

@Component({
  selector: 'webonjour-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card_color = CardColor.dark;
  card_selected = '';

  @Input() card_title = 'Card Title';

  constructor(private router: Router) {}

  onHover(hovered: boolean) {
    if (hovered) {
      this.card_selected = '-dark';
    } else {
      this.card_selected = '';
    }
  }

  onClick() {
    this.router.navigate(['/list-quiz']);
  }
}

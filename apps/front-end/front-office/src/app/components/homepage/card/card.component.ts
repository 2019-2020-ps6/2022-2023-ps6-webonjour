import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '@webonjour/util-interface';

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
  @Input() patient!: Patient.Patient;
  @Input() card_color = CardColor.dark;
  card_selected = '';

  constructor(private router: Router) {}

  onHover(hovered: boolean) {
    if (hovered) {
      this.card_selected = '-dark';
    } else {
      this.card_selected = '';
    }
  }

  onClick() {
    this.router.navigate([`/list-quiz/${this.patient.diseaseStage.valueOf()}`]);
  }
}

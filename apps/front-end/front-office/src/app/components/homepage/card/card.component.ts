import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '@webonjour/util-interface';
import { Store } from '@ngrx/store';
import * as GameActions from '../../../reducers/game/game.actions';
import { Prisma } from '@prisma/client';

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
  @Input() patient!: Prisma.PatientGetPayload<Patient.PatientFull>;
  @Input() card_color = CardColor.dark;
  card_selected = '';

  constructor(private router: Router, private store: Store) {}

  onHover(hovered: boolean) {
    if (hovered) {
      this.card_selected = '-dark';
    } else {
      this.card_selected = '';
    }
  }

  onClick() {
    this.store.dispatch(GameActions.setPatient({ patient: this.patient }));
    this.router.navigate(['/list-quiz']);
  }
}

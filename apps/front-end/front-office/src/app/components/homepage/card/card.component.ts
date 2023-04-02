import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '@webonjour/util-interface';
import { patientMocks } from '@webonjour/data-access-fake-backend';
import { GameService } from '@webonjour/front-end/shared/common';

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
  @Input() patient: Patient.Patient = patientMocks.patientMocks[0];
  @Input() card_color = CardColor.dark;
  card_selected = '';

  constructor(private router: Router, private gameService: GameService) {}

  onHover(hovered: boolean) {
    if (hovered) {
      this.card_selected = '-dark';
    } else {
      this.card_selected = '';
    }
  }

  onClick() {
    this.gameService.setCurrentPatient(this.patient);
    this.router.navigate([`/list-quiz/${this.patient.diseaseStage.valueOf()}`]);
  }
}

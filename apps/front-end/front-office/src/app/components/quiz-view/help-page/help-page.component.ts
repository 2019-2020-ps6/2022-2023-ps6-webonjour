import { Component, Input } from '@angular/core';

@Component({
  selector: 'webonjour-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent {
  @Input() clue =
    "Cette couleur ne fait pas partie de l'arc-en-ciel mais en est la combinaison.";
}

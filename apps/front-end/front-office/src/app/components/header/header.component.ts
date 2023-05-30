import { Component, Input } from '@angular/core';
import { environment } from '@webonjour/shared/environments';

@Component({
  selector: 'webonjour-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly environment = environment;

  @Input() showCareGiver: boolean;

  hover = false;

  constructor() {
    this.showCareGiver = true;
  }
  isToggled = false;

  onHover(hover: boolean) {
    this.hover = hover;
  }
}

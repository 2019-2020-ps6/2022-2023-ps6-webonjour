import { Component, Input } from '@angular/core';

@Component({
  selector: 'webonjour-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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

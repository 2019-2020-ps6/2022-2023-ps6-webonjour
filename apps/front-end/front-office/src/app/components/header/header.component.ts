import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as GameActions from '../../reducers/game/game.actions';

@Component({
  selector: 'webonjour-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() showCareGiver: boolean;

  hover = false;

  constructor(private store: Store) {
    this.showCareGiver = true;
  }
  isToggled = false;

  onHover(hover: boolean) {
    this.hover = hover;
  }

  onUsefulClick() {
    this.store.dispatch(GameActions.usefulClick());
  }
}

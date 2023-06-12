import { Component, Input } from '@angular/core';
import { environment, protocol } from '@webonjour/shared/environments';
import { Store } from '@ngrx/store';
import * as GameActions from '../../reducers/game/game.actions';

@Component({
  selector: 'webonjour-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly environment = environment;

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

  getBackOfficeUrl() {
    return `${protocol(environment.back_office.secure)}://${
      environment.back_office.domain
    }`;
  }
}

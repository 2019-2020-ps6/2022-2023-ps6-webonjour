import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as GameActions from '../../../reducers/game/game.actions';

@Component({
  selector: 'webonjour-skip-button',
  templateUrl: './skip-button.component.html',
  styleUrls: ['./skip-button.component.scss'],
})
export class SkipButtonComponent {
  constructor(private store: Store) {}

  onClick() {
    this.store.dispatch(GameActions.skipQuestion());
  }
}

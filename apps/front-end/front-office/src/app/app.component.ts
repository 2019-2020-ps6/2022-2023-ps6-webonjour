import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import * as GameActions from './reducers/game/game.actions';

@Component({
  selector: 'webonjour-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'front-office';

  // get html ref
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store
  ) {
    document.onclick = () => {
      this.store.dispatch(GameActions.click());
    };
  }
}

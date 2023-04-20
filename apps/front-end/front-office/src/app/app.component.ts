import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as GameActions from './reducers/game/game.actions';
import { patientMocks } from '@webonjour/data-access-fake-backend';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'webonjour-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-office';

  constructor(private store: Store, private actions$: Actions) {
    this.store.dispatch(
      GameActions.initGame({
        quizId: '1',
        patient: patientMocks.patientMocks[0],
      })
    );

    this.actions$
      .pipe(ofType(GameActions.loadGameSuccess))
      .subscribe((action) => {
        console.log('action', action);
        this.store.dispatch(GameActions.chooseAnswer({ index: 0 }));
      });
  }
}

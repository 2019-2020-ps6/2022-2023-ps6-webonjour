import { TestBed } from '@angular/core/testing';
import { Action, Store, StoreModule } from '@ngrx/store';

import * as GameActions from './game.actions';
import { GameEffects } from './game.effects';
import {
  fakeBackendProvider,
  patientMocks,
  quizMocks,
} from '@webonjour/data-access-fake-backend';
import { gameReducer, GameState } from './game.reducer';
import { Actions, EffectsModule, ofType } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { HttpClientModule } from '@angular/common/http';
import * as fromGame from './game.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

describe('GameEffects', () => {
  let actions$: Actions;
  let store: Store<{
    game: GameState;
  }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot(appRoutes, {
          initialNavigation: 'enabledBlocking',
        }),
        HttpClientModule,
        StoreModule.forFeature(fromGame.GAME_FEATURE_KEY, fromGame.gameReducer),
        EffectsModule.forFeature([GameEffects]),
        StoreDevtoolsModule.instrument(),
      ],
      providers: [fakeBackendProvider],
    });

    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);
  });

  describe('init$', () => {
    it('should work', () => {
      const expected = GameActions.loadGameSuccess({
        game: {
          quiz: quizMocks.quizList[0],
          score: 0,
          currentQuestion: 0,
          times: [],
          player: patientMocks.patientMocks[0],
        },
      });

      store.dispatch(
        GameActions.initGame({
          quizId: '1',
          patient: patientMocks.patientMocks[0],
        })
      );

      actions$.pipe(ofType(GameActions.loadGameSuccess)).subscribe((action) => {
        console.log('action', action);
      });
    });
  });
});

import { TestBed } from '@angular/core/testing';

import * as GameActions from './game.actions';
import { GameEffects } from './game.effects';
import { patientMocks, quizMocks } from '@webonjour/data-access-mocks';
import * as fromGame from './game.reducer';
import { GameState } from './game.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { QuizSession } from '@prisma/client';

describe('GameEffects', () => {
  let actions$: Observable<Action>;
  let effects: GameEffects;
  let store: MockStore<GameState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GameEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: fromGame.initialGameState }),
      ],
    });
    effects = TestBed.inject(GameEffects);
    store = TestBed.inject(MockStore);
  });

  describe('init$', () => {
    it('should work', () => {
      const expected = GameActions.loadGameSuccess({
        quiz: quizMocks.quizList[0],
        quizSession: null as unknown as QuizSession,
        accommodation: patientMocks.accommodationMocks.map((accommodation) => {
          return {
            ...accommodation,
            id: parseInt(accommodation.id),
          };
        }),
      });

      actions$ = of(
        GameActions.initGame({
          quizId: quizMocks.quizList[0].id,
        })
      );
      store.pipe().subscribe((state) => {
        console.log('state', state);
      });
      effects.init$.subscribe((action) => {
        console.log('action', action);
        expect(action).toEqual(expected);
      });
    });
  });
});

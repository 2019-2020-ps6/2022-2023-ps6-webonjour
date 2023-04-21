import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPageHeaderComponent } from './help-page-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';
import { provideMockStore } from '@ngrx/store/testing';
import { GAME_FEATURE_KEY } from '../../../../reducers/game/game.reducer';

describe('HelpPageHeaderComponent', () => {
  let component: HelpPageHeaderComponent;
  let fixture: ComponentFixture<HelpPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpPageHeaderComponent],

      imports: [HttpClientTestingModule],
      providers: [
        fakeBackendProvider,
        provideMockStore({
          initialState: {
            [GAME_FEATURE_KEY]: {
              quiz: {
                title: 'test',
                questions: [
                  {
                    id: 1,
                  },
                ],
              },
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

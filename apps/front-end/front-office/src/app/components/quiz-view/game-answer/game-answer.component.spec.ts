import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAnswerComponent } from './game-answer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeBackendProvider } from '@webonjour/data-access-fake-backend';
import { provideMockStore } from '@ngrx/store/testing';

describe('GameAnswerComponent', () => {
  let component: GameAnswerComponent;
  let fixture: ComponentFixture<GameAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameAnswerComponent],
      imports: [HttpClientTestingModule],
      providers: [fakeBackendProvider, provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(GameAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

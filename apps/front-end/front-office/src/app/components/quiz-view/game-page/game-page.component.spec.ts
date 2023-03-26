import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePageComponent } from './game-page.component';
import { Component, Input } from '@angular/core';
import { Quiz } from '@webonjour/util-interface';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePageComponent, MockGameQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'webonjour-game-question',
  template: '',
})
class MockGameQuestionComponent {
  @Input() question = {} as Quiz.Question;
}

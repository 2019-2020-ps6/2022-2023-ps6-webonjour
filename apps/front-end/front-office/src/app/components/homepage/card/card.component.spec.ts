import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.patient = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 42,
      floor: 1,
      diseaseStage: 'STAGE_1',
      accommodations: [],
      quizzes: [],
      familyMembers: [],
      description: '',
      profilePictureUrl: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

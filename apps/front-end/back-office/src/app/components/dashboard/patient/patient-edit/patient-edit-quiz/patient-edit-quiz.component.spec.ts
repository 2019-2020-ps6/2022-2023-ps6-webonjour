import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditQuizComponent } from './patient-edit-quiz.component';

describe('PatientEditQuizComponent', () => {
  let component: PatientEditQuizComponent;
  let fixture: ComponentFixture<PatientEditQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientEditQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

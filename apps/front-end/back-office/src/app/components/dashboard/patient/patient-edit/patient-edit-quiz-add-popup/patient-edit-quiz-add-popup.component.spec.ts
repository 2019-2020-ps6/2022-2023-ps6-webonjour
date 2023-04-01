import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditQuizAddPopupComponent } from './patient-edit-quiz-add-popup.component';

describe('PatientEditQuizAddPopupComponent', () => {
  let component: PatientEditQuizAddPopupComponent;
  let fixture: ComponentFixture<PatientEditQuizAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientEditQuizAddPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditQuizAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditAccommodationComponent } from './patient-edit-accommodation.component';

describe('PatientEditAccommodationComponent', () => {
  let component: PatientEditAccommodationComponent;
  let fixture: ComponentFixture<PatientEditAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientEditAccommodationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

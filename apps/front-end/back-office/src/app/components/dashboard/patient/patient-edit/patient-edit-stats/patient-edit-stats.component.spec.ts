import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditStatsComponent } from './patient-edit-stats.component';

describe('PatientEditStatsComponent', () => {
  let component: PatientEditStatsComponent;
  let fixture: ComponentFixture<PatientEditStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientEditStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

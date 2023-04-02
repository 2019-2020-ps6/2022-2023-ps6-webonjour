import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditStatsComponent } from './patient-edit-stats.component';
import { Component } from '@angular/core';

describe('PatientEditStatsComponent', () => {
  let component: PatientEditStatsComponent;
  let fixture: ComponentFixture<PatientEditStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientEditStatsComponent],
      imports: [
        // NgApexchartsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

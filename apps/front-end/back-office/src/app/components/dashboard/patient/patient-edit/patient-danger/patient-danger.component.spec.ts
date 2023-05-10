import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDangerComponent } from './patient-danger.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientDangerComponent', () => {
  let component: PatientDangerComponent;
  let fixture: ComponentFixture<PatientDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PatientDangerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

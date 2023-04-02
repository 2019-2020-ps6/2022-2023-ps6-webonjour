import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditAccommodationComponent } from './patient-edit-accommodation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('PatientEditAccommodationComponent', () => {
  let component: PatientEditAccommodationComponent;
  let fixture: ComponentFixture<PatientEditAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientEditAccommodationComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        RouterTestingModule,
        MatDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

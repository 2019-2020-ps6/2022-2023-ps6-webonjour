import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFamilyComponent } from './patient-family.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientFamilyComponent', () => {
  let component: PatientFamilyComponent;
  let fixture: ComponentFixture<PatientFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientFamilyComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        RouterTestingModule,
        MatDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

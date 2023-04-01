import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditQuizComponent } from './patient-edit-quiz.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

describe('PatientEditQuizComponent', () => {
  let component: PatientEditQuizComponent;
  let fixture: ComponentFixture<PatientEditQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientEditQuizComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        {
          //activateRoute
          provide: 'ActivatedRoute',
          useValue: {
            snapshot: {
              firstChild: {
                routeConfig: {
                  title: 'Les Quiz',
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientEditQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

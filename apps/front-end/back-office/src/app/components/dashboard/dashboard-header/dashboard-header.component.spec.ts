import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeaderComponent } from './dashboard-header.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardHeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          activatedRoute: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                title: 'Dashboard',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

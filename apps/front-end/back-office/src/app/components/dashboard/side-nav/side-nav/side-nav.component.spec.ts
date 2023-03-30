import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let routerSpy: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavComponent, ProfileMockComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard',
            component: DashboardComponent,
            data: {
              navPath: 'dashboard',
            },
            children: [
              {
                path: 'quiz',
                component: DashboardComponent,
                title: 'Quiz',
                data: {
                  navPath: 'quiz',
                },
              },
              {
                path: 'patients',
                component: DashboardComponent,
                title: 'Les Patients',
                data: {
                  navPath: 'Les patients',
                },
              },
            ],
          },
        ]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                routeConfig: {
                  path: 'quiz',
                },
                data: {
                  navPath: 'patients',
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 nav items', () => {
    expect(component.navItems.length).toEqual(2);
  });

  it('should have the active route as active', () => {
    const css = component.getCssClass('patients');
    expect(css).toContain('active');
  });
});

@Component({
  selector: 'webonjour-profile',
  template: '',
})
export class ProfileMockComponent {}

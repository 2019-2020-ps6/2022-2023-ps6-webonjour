import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from '../../auth/login/login.component';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'quiz',
        component: LoginComponent,
      },
      {
        path: 'patients',
        component: LoginComponent,
      },
    ],
  },
];

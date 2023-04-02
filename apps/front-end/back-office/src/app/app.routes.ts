import { Route } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { QuestionDetailComponent } from './components/quiz-creation/question-detail/question-detail.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

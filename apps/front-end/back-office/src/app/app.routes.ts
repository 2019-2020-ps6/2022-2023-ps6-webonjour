import { Route } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { QuizCreateComponent } from './components/quiz-creation/quiz-create/quiz-create.component';

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
    path: 'create',
    component: QuizCreateComponent,
  },
];

import { Route } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

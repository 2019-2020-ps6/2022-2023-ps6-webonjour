import { Route } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { LoginComponent } from './components/auth/login/login.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

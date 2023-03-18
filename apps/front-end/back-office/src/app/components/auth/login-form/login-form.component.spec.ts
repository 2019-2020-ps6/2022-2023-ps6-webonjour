import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../services/util/alert.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from '@webonjour/util-interface';
import { authMocks } from '@webonjour/data-access-fake-backend';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let alertService: AlertService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'redirect',
            component: LoginComponent,
          },
        ]),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                returnUrl: '/redirect',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // spy on alert service
    alertService = TestBed.inject(AlertService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  });
  it('should return controls', () => {
    expect(component.formControls).toEqual(component.form.controls);
  });
  it('should set submitted to true', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should clear alerts', () => {
    // verify that clear alerts is called
    const spy = jest.spyOn(alertService, 'clear');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call login if form is valid', () => {
    // verify that login is called
    const spy = jest.spyOn(authService, 'login');
    component.form.setValue({
      email: 'example@email.com',
      password: 'password',
    });
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });
  it('should not call login if form is invalid', () => {
    const spy = jest.spyOn(authService, 'login');
    component.form.setValue({
      email: '',
      password: '',
    });
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });
  it('should redirect to url in params if login is successful', () => {
    // verify that login is called
    const spy = jest.spyOn(authService, 'login');
    spy.mockImplementation(() => {
      return new Observable((observer) => {
        observer.next({
          status: RequestStatus.SUCCESS,
          data: authMocks.response,
          message: 'message',
        });
        observer.complete();
      });
    });

    component.form.setValue({
      email: 'example@email.com',
      password: 'password',
    });

    const routerSpy = jest.spyOn(router, 'navigateByUrl');

    component.onSubmit();
    expect(routerSpy).toHaveBeenCalledWith('/redirect');
  });
  it('should call alert service if login is unsuccessful', () => {
    const spy = jest.spyOn(authService, 'login');
    spy.mockImplementation(() => {
      return new Observable((observer) => {
        const error = new HttpErrorResponse({
          error: {
            status: RequestStatus.ERROR,
            data: null,
            message: 'message',
          },
        });
        observer.error(error);
        observer.complete();
      });
    });

    component.form.setValue({
      email: 'example@email.com',
      password: 'password',
    });

    const alertSpy = jest.spyOn(alertService, 'error');
    component.onSubmit();
    expect(alertSpy).toHaveBeenCalledWith('message');
  });
});

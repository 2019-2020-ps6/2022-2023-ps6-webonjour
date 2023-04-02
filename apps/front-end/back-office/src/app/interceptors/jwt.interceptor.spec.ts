import { TestBed } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { authMocks } from '@webonjour/data-access-fake-backend';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { RequestStatus } from '@webonjour/util-interface';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../components/auth/login/login.component';

describe('JwtInterceptor', () => {
  let client: HttpClient;
  let controller: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: LoginComponent,
          },
        ]),
      ],
      providers: [
        // register our interceptor with the testing module
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
      ],
    });

    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it('should refresh token', () => {
    jest.spyOn(authService, 'refresh').mockImplementation(() => {
      authService.accessToken = authMocks.response.accessToken;
      authService.refreshToken = authMocks.response.refreshToken;
      return new Observable((observer) => {
        observer.next({
          data: authMocks.response,
          status: RequestStatus.SUCCESS,
          message: 'Login successful',
        });
        observer.complete();
      });
    });
    client.get('/unauthorized').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = controller.expectOne('/unauthorized');
    req.flush(null, { status: 401, statusText: 'Unauthorized' });

    const req2 = controller.expectOne('/unauthorized');
    expect(req2.request.headers.get('Authorization')).toEqual(
      `Bearer ${authMocks.response.accessToken}`
    );

    req2.flush(
      {
        status: 'success',
        data: authMocks.response,
        message: 'Login successful',
      },
      { status: 200, statusText: 'authorized' }
    );
  });

  it('should redirect to login failing to refresh token', function () {
    jest.spyOn(authService, 'refresh').mockImplementation(() => {
      authService.accessToken = authMocks.response.accessToken;
      authService.refreshToken = authMocks.response.refreshToken;
      return new Observable((observer) => {
        observer.error(
          new HttpErrorResponse({
            error: {
              status: RequestStatus.ERROR,
              data: null,
              message: 'Refresh failed',
            },
            status: 401,
          })
        );
        observer.complete();
      });
    });

    client.get('/unauthorized').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = controller.expectOne('/unauthorized');
    req.flush(null, { status: 401, statusText: 'Unauthorized' });
  });
});

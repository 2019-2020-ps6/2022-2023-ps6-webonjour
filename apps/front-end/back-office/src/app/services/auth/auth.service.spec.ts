import { TestBed } from '@angular/core/testing';
import { Auth, RequestWrapper } from '@webonjour/util-interface';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { fail } from 'assert';
import { authMocks } from '@webonjour/data-access-fake-backend';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const response = authMocks.response;
  const credentials = authMocks.credentials;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // mock the http client and test the login method
  it('should login', () => {
    // test that service login returns the api response
    service.login(credentials).subscribe({
      next: (res: RequestWrapper<Auth.LoginResponse>) => {
        expect(res.status).toEqual('success');
        expect(res.data.accessToken).toEqual(response.accessToken);
        expect(res.data.refreshToken).toEqual(response.refreshToken);
      },
      error: () => {
        fail('error should not be called');
      },
    });

    const req = httpMock.expectOne(`${service.AUTH_URL}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 'success',
      data: response,
      message: 'Login successful',
    });

    expect(service.accessToken).toEqual(response.accessToken);
    expect(service.refreshToken).toEqual(response.refreshToken);

    expect(localStorage.getItem('accessToken')).toEqual(response.accessToken);
    expect(localStorage.getItem('refreshToken')).toEqual(response.refreshToken);

    expect(service.jwtPayload).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
      type: 'access',
    });
  });

  it('should logout', function () {
    // test that service login returns the api response
    service.login(credentials).subscribe();

    const req = httpMock.expectOne(`${service.AUTH_URL}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 'success',
      data: response,
      message: 'Login successful',
    });

    expect(service.accessToken).toBeTruthy();
    expect(service.refreshToken).toBeTruthy();
    expect(service.jwtPayload).toBeTruthy();
    service.logout();
    expect(service.accessToken).toBeUndefined();
    expect(service.refreshToken).toBeUndefined();
    expect(service.jwtPayload).toBeUndefined();
  });

  it('should load token from local storage', function () {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    service.loadTokenFromLocalStorage();
    expect(service.accessToken).toEqual(response.accessToken);
    expect(service.refreshToken).toEqual(response.refreshToken);
  });

  it('should propagate error', function () {
    service.login(credentials).subscribe({
      next: () => {
        fail('should not be called');
      },
      error: (err: RequestWrapper<Auth.LoginResponse>) => {
        expect(err.message).toEqual('error message');
      },
    });
    const req = httpMock.expectOne(`${service.AUTH_URL}/login`);
    expect(req.request.method).toBe('POST');

    req.flush({
      status: 'error',
      data: null,
      message: 'error message',
    });
  });

  it('should refresh token', function () {
    service.refresh().subscribe({
      next: (res: RequestWrapper<Auth.LoginResponse>) => {
        expect(res.status).toEqual('success');
        expect(res.data.accessToken).toEqual(response.accessToken);
        expect(res.data.refreshToken).toEqual(response.refreshToken);
      },
    });
    const req = httpMock.expectOne(`${service.AUTH_URL}/refresh`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 'success',
      data: response,
      message: 'Refresh successful',
    });
  });
});

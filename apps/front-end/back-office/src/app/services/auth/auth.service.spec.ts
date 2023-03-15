import { TestBed } from '@angular/core/testing';
import { Auth, RequestWrapper } from '@webonjour/util-interface';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

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
    const credentials: Auth.LoginSchema = {
      email: 'email@email.com',
      password: 'password',
    };
    const response: Auth.LoginResponse = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoiYWNjZXNzIn0.SWw75nUVldk2qUs1wiTx7ZIpjPAMLuGwOnxs_NMVUJM',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoicmVmcmVzaCJ9.rzQhdqE2VpiJ8mdD24FghBZ71D64CWMwQR5_c3_z-w0',
    };

    // test that service login returns the api response
    service
      .login(credentials)
      .subscribe((res: RequestWrapper<Auth.LoginResponse>) => {
        expect(res.status).toEqual('success');
        expect(res.data.accessToken).toEqual(response.accessToken);
        expect(res.data.refreshToken).toEqual(response.refreshToken);
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
    const credentials: Auth.LoginSchema = {
      email: 'email@email.com',
      password: 'password',
    };
    const response: Auth.LoginResponse = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoiYWNjZXNzIn0.SWw75nUVldk2qUs1wiTx7ZIpjPAMLuGwOnxs_NMVUJM',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoicmVmcmVzaCJ9.rzQhdqE2VpiJ8mdD24FghBZ71D64CWMwQR5_c3_z-w0',
    };
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
    localStorage.setItem(
      'accessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoiYWNjZXNzIn0.SWw75nUVldk2qUs1wiTx7ZIpjPAMLuGwOnxs_NMVUJM'
    );
    localStorage.setItem(
      'refreshToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoicmVmcmVzaCJ9.rzQhdqE2VpiJ8mdD24FghBZ71D64CWMwQR5_c3_z-w0'
    );
    service.loadTokenFromLocalStorage();
    expect(service.accessToken).toEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoiYWNjZXNzIn0.SWw75nUVldk2qUs1wiTx7ZIpjPAMLuGwOnxs_NMVUJM'
    );
    expect(service.refreshToken).toEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoicmVmcmVzaCJ9.rzQhdqE2VpiJ8mdD24FghBZ71D64CWMwQR5_c3_z-w0'
    );
  });
});

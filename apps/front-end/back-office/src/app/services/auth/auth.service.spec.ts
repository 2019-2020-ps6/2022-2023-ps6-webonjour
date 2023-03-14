import { TestBed } from '@angular/core/testing';
import { Auth } from '@webonjour/util-interface';
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

    service.login(credentials).subscribe((res: Auth.LoginResponse) => {
      expect(res).toEqual(response);
    });
    const req = httpMock.expectOne(`${service.AUTH_URL}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(response);

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

    service.login(credentials).subscribe((res: Auth.LoginResponse) => {
      expect(res).toEqual(response);
    });
    const req = httpMock.expectOne(`${service.AUTH_URL}/login`);
    req.flush(response);
    expect(service.accessToken).toBeTruthy();
    expect(service.refreshToken).toBeTruthy();
    expect(service.jwtPayload).toBeTruthy();
    service.logout();
    expect(service.accessToken).toBeNull();
    expect(service.refreshToken).toBeNull();
    expect(service.jwtPayload).toEqual(null);
  });
});

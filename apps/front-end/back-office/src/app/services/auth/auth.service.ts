import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Auth } from '@webonjour/util-interface';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public accessToken: string | null = null;
  public refreshToken: string | null = null;
  public jwtPayload: Auth.JWTPayload | null = null;
  AUTH_URL = 'http://localhost:3333';

  constructor(private httpClient: HttpClient) {}

  login(credentials: Auth.LoginSchema): Observable<Auth.LoginResponse> {
    return this.httpClient
      .post<Auth.LoginResponse>(this.AUTH_URL + '/login', credentials)
      .pipe(
        map((response: Auth.LoginResponse) => {
          this.accessToken = response.accessToken;
          this.refreshToken = response.refreshToken;
          localStorage.setItem('accessToken', this.accessToken);
          localStorage.setItem('refreshToken', this.refreshToken);
          this.jwtPayload = jwt_decode<Auth.JWTPayload>(this.accessToken);
          return response;
        })
      );
  }

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.jwtPayload = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

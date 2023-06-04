import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Auth, RequestWrapper } from '@webonjour/util-interface';
import jwt_decode from 'jwt-decode';
import { environment, protocol } from '@webonjour/shared/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public accessToken?: string;
  public refreshToken?: string;
  public jwtPayload?: Auth.JWTPayload;
  AUTH_URL = `${protocol(environment.api.secure)}://${environment.api.domain}`;

  // load from localstorage if found
  constructor(private httpClient: HttpClient) {
    this.loadTokenFromLocalStorage();
  }

  login(
    credentials: Auth.LoginSchema
  ): Observable<RequestWrapper<Auth.LoginResponse>> {
    return this.httpClient
      .post<RequestWrapper<Auth.LoginResponse>>(
        this.AUTH_URL + '/login',
        credentials
      )
      .pipe(
        map((response: RequestWrapper<Auth.LoginResponse>) => {
          return this.extractJWT(response);
        })
      );
  }

  private extractJWT(response: RequestWrapper<Auth.LoginResponse>) {
    if (response.status !== 'success') {
      throw new Error(response.message);
    }

    this.accessToken = response.data.accessToken;
    this.refreshToken = response.data.refreshToken;
    localStorage.setItem('accessToken', this.accessToken);
    localStorage.setItem('refreshToken', this.refreshToken);
    this.jwtPayload = jwt_decode<Auth.JWTPayload>(this.accessToken);
    return response;
  }

  refresh(): Observable<RequestWrapper<Auth.LoginResponse>> {
    return this.httpClient
      .post<RequestWrapper<Auth.LoginResponse>>(this.AUTH_URL + '/refresh', {
        refreshToken: this.refreshToken,
      })
      .pipe(
        map((response: RequestWrapper<Auth.LoginResponse>) => {
          return this.extractJWT(response);
        })
      );
  }

  logout(): void {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.jwtPayload = undefined;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  loadTokenFromLocalStorage() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.jwtPayload = jwt_decode<Auth.JWTPayload>(this.accessToken);
    }
  }
}

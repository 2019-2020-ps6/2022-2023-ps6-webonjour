import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.accessToken}`,
      },
    });
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.authService.refresh().pipe(
              switchMap(() => {
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this.authService.accessToken}`,
                  },
                });
                return next.handle(request).pipe(
                  catchError((err) => {
                    if (err instanceof HttpErrorResponse) {
                      if (err.status === 401) {
                        this.router.navigate(['/login']);
                      }
                    }
                    return throwError(() => err);
                  })
                );
              }),
              catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    this.router.navigate(['/login']);
                  }
                }
                return throwError(() => err);
              })
            );
          }
        }
        return throwError(() => err);
      })
    );
  }
}

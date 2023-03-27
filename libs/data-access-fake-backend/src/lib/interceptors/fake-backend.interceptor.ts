import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  delay,
  dematerialize,
  materialize,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { Auth, Quiz } from '@webonjour/util-interface';
import { credentials, response } from '../mocks/auth';
import { quizList } from '../mocks/quiz';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { url, method, body } = request;

    return handleRoute();

    function getAllQuiz() {
      return ok(quizList);
    }

    function handleRoute() {
      if (url.endsWith('/login') && method === 'POST') {
        return login();
      } else if (url.endsWith('/refresh') && method === 'POST') {
        return refresh();
      } else if (url.endsWith('/quiz') && method === 'GET') {
        return getAllQuiz();
      }
      // quiz detail
      else if (url.match(/\/quiz\/\d+$/) && method === 'GET') {
        const id = url.split('/').pop();
        const quiz = quizList.find((x) => x.id === id);
        return ok(quiz);
      } else if (url.match(/\/quiz\/\d+\/question$/) && method === 'POST') {
        const split = url.split('/');
        const id = split[split.length - 2];
        const quiz = quizList.find((x) => x.id === id);
        quiz?.questions.push(body as Quiz.Question);
        return ok(quizList.find((x) => x.id === id));
      } else {
        return next.handle(request);
      }
    }

    // route functions
    function login() {
      const givenCredentials = body as Auth.LoginSchema;
      if (
        givenCredentials.email === credentials.email &&
        givenCredentials.password === credentials.password
      ) {
        return ok(response);
      }
      return error('Invalid email or password');
    }

    function refresh() {
      const refreshToken = (body as Auth.RefreshSchema).refreshToken;
      if (refreshToken == response.refreshToken) {
        return ok(response);
      }
      return error('Invalid refresh token');
    }

    // helper functions
    function ok(body?: unknown) {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: 'success',
            data: body,
            message: 'OK',
          },
        })
      ).pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: string) {
      return throwError(() => {
        return new HttpErrorResponse({
          status: 400,
          error: {
            status: 'error',
            message: message,
          },
        });
      }).pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};

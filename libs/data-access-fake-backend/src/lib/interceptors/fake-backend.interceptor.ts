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
import { Auth, Patient, Quiz } from '@webonjour/util-interface';
import { credentials, response } from '../mocks/auth';
import { quizList } from '../mocks/quiz';
import {
  accommodationMocks,
  accommodationPatientMocks,
  familyMemberMocks,
  familyMemberPatientMocks,
  patientMocks,
  patientQuizMocks,
} from '../mocks/patient';

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

    function createQuiz(quiz: Quiz.Quiz) {
      quizList.push(quiz);
      return ok();
    }

    function getQuizDetail() {
      const id = url.split('/').pop();
      const quiz = quizList.find((x) => x.id === id);
      return ok(quiz);
    }

    function addQuestionToQuiz() {
      const split = url.split('/');
      const id = split[split.length - 2];
      const quiz = quizList.find((x) => x.id === id);
      quiz?.questions.push(body as Quiz.Question);
      return ok(quizList.find((x) => x.id === id));
    }

    function getAllPatient() {
      return ok(patientMocks);
    }

    function createPatient(body1: Patient.Patient) {
      patientMocks.push(body1);
      return ok();
    }

    function getPatientDetail() {
      const id = url.split('/').pop();
      const patient = patientMocks.find((x) => x.id === id);
      return ok(patient);
    }

    function updatePatient(body1: Patient.Patient) {
      const id = url.split('/').pop();
      const patient = patientMocks.find((x) => x.id === id);
      if (patient) {
        patientMocks[patientMocks.indexOf(patient)] = body1;
        return ok(patientMocks.find((x) => x.id === id));
      }
      return error('Patient not found');
    }

    function handleRoute() {
      if (url.endsWith('/login') && method === 'POST') {
        return login();
      } else if (url.endsWith('/refresh') && method === 'POST') {
        return refresh();
      } else if (url.endsWith('/quiz') && method === 'GET') {
        return getAllQuiz();
      }
      // quiz
      else if (url.match(/\/quiz\/\d+$/) && method === 'GET') {
        return getQuizDetail();
      } else if (url.match(/\/quiz\/\d+\/question$/) && method === 'POST') {
        return addQuestionToQuiz();
      } else if (url.endsWith('/quiz') && method === 'POST') {
        return createQuiz(body as Quiz.Quiz);
      }

      // patient
      else if (url.endsWith('/patient') && method === 'GET') {
        return getAllPatient();
      } else if (url.endsWith('/patient') && method === 'POST') {
        return createPatient(body as Patient.Patient);
      } else if (url.match(/\/patient\/\d+$/) && method === 'GET') {
        return getPatientDetail();
      } else if (url.match(/\/patient\/\d+$/) && method === 'PUT') {
        return updatePatient(body as Patient.Patient);
      } else if (url.match(/\/patient\/\d+$/) && method === 'DELETE') {
        const id = url.split('/').pop();
        const patient = patientMocks.find((x) => x.id === id);
        if (patient) {
          patientMocks.splice(patientMocks.indexOf(patient), 1);
          return ok();
        }
        return error('Patient not found');
      } else if (url.match(/\/patient\/\d+\/quiz\/\d+$/) && method === 'POST') {
        const split = url.split('/');
        const patientId = split[split.length - 3];
        const quizId = split[split.length - 1];
        patientQuizMocks[patientId] = patientQuizMocks[patientId] || [];
        patientQuizMocks[patientId].push(quizId);
        return ok();
      } else if (
        url.match(/\/patient\/\d+\/quiz\/\d+$/) &&
        method === 'DELETE'
      ) {
        const split = url.split('/');
        const patientId = split[split.length - 3];
        const quizId = split[split.length - 1];
        patientQuizMocks[patientId] = patientQuizMocks[patientId] || [];
        patientQuizMocks[patientId].splice(
          patientQuizMocks[patientId].indexOf(quizId),
          1
        );
        return ok();
      } else if (url.match(/\/patient\/\d+\/quiz$/) && method === 'GET') {
        const split = url.split('/');
        const patientId = split[split.length - 2];
        const quizIds = patientQuizMocks[patientId] || [];
        const quizzes = quizList.filter((x) => quizIds.includes(x.id));
        return ok(quizzes);
      }
      // family members
      else if (url.match(/\/patient\/\d+\/family$/) && method === 'GET') {
        const split = url.split('/');
        const patientId = split[split.length - 2];
        const familyMembersIds = familyMemberPatientMocks[patientId] || [];
        const familyMembers = familyMemberMocks.filter((x) =>
          familyMembersIds.includes(x.id)
        );
        return ok(familyMembers);
      } else if (url.match(/\/patient\/\d+\/family$/) && method === 'POST') {
        const split = url.split('/');
        const patientId = split[split.length - 2];
        const familyMember = body as Patient.FamilyMember;
        familyMember.id = familyMemberMocks.length + 1 + '';
        familyMemberMocks.push(familyMember);
        familyMemberPatientMocks[patientId] =
          familyMemberPatientMocks[patientId] || [];
        familyMemberPatientMocks[patientId].push(familyMember.id);
        return ok(familyMember);
      } else if (
        url.match(/\/patient\/\d+\/family\/\d+$/) &&
        method === 'DELETE'
      ) {
        const split = url.split('/');
        const patientId = split[split.length - 3];
        const familyMemberId = split[split.length - 1];
        familyMemberPatientMocks[patientId] =
          familyMemberPatientMocks[patientId] || [];
        familyMemberPatientMocks[patientId].splice(
          familyMemberPatientMocks[patientId].indexOf(familyMemberId),
          1
        );
        return ok();
      }
      // patient accommodation
      else if (url.match(/\/patient\/\d+\/accomodation$/) && method === 'GET') {
        const split = url.split('/');
        const patientId = split[split.length - 2];
        const accommodationIds = accommodationPatientMocks[patientId] || [];
        const accommodations = accommodationMocks.filter((x) =>
          accommodationIds.includes(x.id)
        );
        return ok(accommodations);
      } else if (
        url.match(/\/patient\/\d+\/accomodation$/) &&
        method === 'POST'
      ) {
        const split = url.split('/');
        const patientId = split[split.length - 2];
        const accommodation = body as Patient.Accommodation;
        accommodation.id = accommodationMocks.length + 1 + '';
        accommodationMocks.push(accommodation);
        accommodationPatientMocks[patientId] =
          accommodationPatientMocks[patientId] || [];
        accommodationPatientMocks[patientId].push(accommodation.id);
        return ok(accommodation);
      } else if (
        url.match(/\/patient\/\d+\/accomodation\/\d+$/) &&
        method === 'DELETE'
      ) {
        const split = url.split('/');
        const patientId = split[split.length - 3];
        const accommodationId = split[split.length - 1];
        accommodationPatientMocks[patientId] =
          accommodationPatientMocks[patientId] || [];
        accommodationPatientMocks[patientId].splice(
          accommodationPatientMocks[patientId].indexOf(accommodationId),
          1
        );
        return ok();
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

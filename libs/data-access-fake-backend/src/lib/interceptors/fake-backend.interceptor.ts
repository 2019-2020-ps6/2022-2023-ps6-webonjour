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
import {
  authMocks,
  patientMocks as patientMock,
  quizMocks,
} from '@webonjour/data-access-mocks';
import { Answer, Clue, Prisma } from '@prisma/client';

const credentials = authMocks.credentials;
const response = authMocks.response;
const quizList = quizMocks.quizList;
const accommodationMocks = patientMock.accommodationMocks;
const accommodationPatientMocks = patientMock.accommodationPatientMocks;
const familyMemberMocks = patientMock.familyMemberMocks;
const familyMemberPatientMocks = patientMock.familyMemberPatientMocks;
const patientMocks = patientMock.patientMocks;
const patientQuizMocks = patientMock.patientQuizMocks;

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;
type Question = Prisma.QuestionGetPayload<Quiz.QuestionWithAnswersAndClues>;

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

    function getQuestionById() {
      const id = Number(url.split('/').pop());
      const questions: unknown[] = [];
      quizList.forEach((quiz) => {
        quiz.questions.forEach((question) => {
          if (question.id === id) {
            questions.push(question);
          }
        });
      });

      return ok(questions[0]);
    }

    function getAnswerById() {
      const id = Number(url.split('/').pop());
      const answers: unknown[] = [];
      quizList.forEach((quiz) => {
        quiz.questions.forEach((question) => {
          question.answers.forEach((answer) => {
            if (answer.id === id) {
              answers.push(answer);
            }
          });
        });
      });

      return ok(answers[0]);
    }

    function getClueById() {
      const id = Number(url.split('/').pop());
      const clues: unknown[] = [];
      quizList.forEach((quiz) => {
        quiz.questions.forEach((question) => {
          question.clues.forEach((clue) => {
            if (clue.id === id) {
              clues.push(clue);
            }
          });
        });
      });

      return ok(clues[0]);
    }

    function createQuestion() {
      const question = body as Question;
      const quiz = quizList.find((x) => x.id === question.quizId);
      if (!quiz) return error('Quiz not found');
      question.id = Math.max(...quiz.questions.map((x) => +x.id)) + 1;
      quiz?.questions.push(question);
      return ok(question);
    }

    function createQuiz(quiz: Quiz) {
      quiz.id = Math.max(...quizList.map((x) => +x.id)) + 1;
      quizList.push(quiz);
      return ok(quiz);
    }

    function getQuizDetail() {
      const id = Number(url.split('/').pop());
      const quiz = quizList.find((x) => x.id === id);
      return ok(quiz);
    }

    function addQuestionToQuiz() {
      const split = url.split('/');
      const id = Number(split[split.length - 2]);
      const quiz = quizList.find((x) => x.id === id);
      quiz?.questions.push(body as Question);
      return ok(quizList.find((x) => x.id === id));
    }

    function getAllPatient() {
      return ok(patientMocks);
    }

    function createPatient(body1: Patient.Patient) {
      // get new patient id
      const newPatientId = Math.max(...patientMocks.map((x) => +x.id)) + 1;
      body1.id = newPatientId.toString();
      patientMocks.push(body1);
      return ok(body1);
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

    function addQuizToPatient() {
      const split = url.split('/');
      const patientId = split[split.length - 3];
      const quizId = split[split.length - 1];
      patientQuizMocks[patientId] = patientQuizMocks[patientId] || [];
      patientQuizMocks[patientId].push(quizId);
      return ok();
    }

    function deleteQuizPatient() {
      const split = url.split('/');
      const patientId = split[split.length - 3];
      const quizId = split[split.length - 1];

      patientQuizMocks[patientId] = patientQuizMocks[patientId] || [];
      patientQuizMocks[patientId].splice(
        patientQuizMocks[patientId].indexOf(quizId),
        1
      );
      return ok();
    }

    function deletePatient() {
      const id = url.split('/').pop();
      const patient = patientMocks.find((x) => x.id === id);
      if (patient) {
        patientMocks.splice(patientMocks.indexOf(patient), 1);
        return ok();
      }
      return error('Patient not found');
    }

    function getPatientFamily() {
      const split = url.split('/');
      const patientId = split[split.length - 2];
      const familyMembersIds = familyMemberPatientMocks[patientId] || [];
      const familyMembers = familyMemberMocks.filter((x) =>
        familyMembersIds.includes(x.id)
      );
      return ok(familyMembers);
    }

    function addPatientFamily() {
      const split = url.split('/');
      const patientId = split[split.length - 2];
      const familyMember = body as Patient.FamilyMember;
      familyMember.id = familyMemberMocks.length + 1 + '';
      familyMemberMocks.push(familyMember);
      familyMemberPatientMocks[patientId] =
        familyMemberPatientMocks[patientId] || [];
      familyMemberPatientMocks[patientId].push(familyMember.id);
      return ok(familyMember);
    }

    function deletePatientFamily() {
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

    function getPatientAccommodation() {
      const split = url.split('/');
      const patientId = split[split.length - 2];
      const accommodationIds = accommodationPatientMocks[patientId] || [];
      const accommodations = accommodationMocks.filter((x) =>
        accommodationIds.includes(x.id)
      );
      return ok(accommodations);
    }

    function addAccommodationPatient() {
      const split = url.split('/');
      const patientId = split[split.length - 2];
      const accommodation = body as Patient.Accommodation;
      accommodationPatientMocks[patientId] =
        accommodationPatientMocks[patientId] || [];
      accommodationPatientMocks[patientId].push(accommodation.id);
      return ok(accommodation);
    }

    function deleteAccommodationPatient() {
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
    }

    function getPatientQuiz() {
      const split = url.split('/');
      const patientId = split[split.length - 2];
      const quizIds = patientQuizMocks[patientId] || [];
      const quizzes = quizList.filter((x) => quizIds.includes(String(x.id)));
      return ok(quizzes);
    }

    function getAllAccommodation() {
      return ok(accommodationMocks);
    }

    function deleteQuiz(id: number) {
      const index = quizList.findIndex((x) => x.id === id);
      quizList.splice(index, 1);
      return ok();
    }

    function updatePatientFamily() {
      const split = url.split('/');
      const familyMemberId = split[split.length - 1];
      const familyMember = familyMemberMocks.find(
        (x) => x.id === familyMemberId
      ) as Patient.FamilyMember;
      if (familyMember) {
        familyMemberMocks[familyMemberMocks.indexOf(familyMember)] =
          body as Patient.FamilyMember;
        return ok(familyMemberMocks.find((x) => x.id === familyMemberId));
      }
      return error('Family member not found');
    }

    function handleRoute() {
      console.log('handleRoute', url, method);
      if (url.endsWith('/login') && method === 'POST') {
        return login();
      } else if (url.endsWith('/refresh') && method === 'POST') {
        return refresh();
      }
      // question
      else if (url.match(/\/question\/\d+$/) && method === 'GET') {
        return getQuestionById();
      } else if (url.match(/\/answer\/\d+$/) && method === 'GET') {
        return getAnswerById();
      } else if (url.match(/\/clue\/\d+$/) && method === 'GET') {
        return getClueById();
      }

      // quiz
      else if (url.match(/\/quiz\/\d+$/) && method === 'GET') {
        const id = Number(url.split('/').pop());
        const quiz = quizList.find((x) => x.id === id);
        return ok(quiz);
      } else if (
        url.match(/\/patients\/\d+\/quiz\/\d+$/) &&
        method === 'DELETE'
      ) {
        return deleteQuizPatient();
      } else if (url.match(/\/quiz\/\d+$/) && method === 'DELETE') {
        const id = Number(url.split('/').pop());
        return deleteQuiz(id);
      } else if (url.match(/\/quiz\/\d+\/question$/) && method === 'POST') {
        return addQuestionToQuiz();
      } else if (url.endsWith('/quiz') && method === 'POST') {
        return createQuiz(body as Quiz);
      }

      // patient
      else if (url.match(/\/patients\/\d+$/) && method === 'GET') {
        return getPatientDetail();
      } else if (url.match(/\/patients\/\d+$/) && method === 'PUT') {
        return updatePatient(body as Patient.Patient);
      } else if (url.match(/\/patients\/\d+$/) && method === 'DELETE') {
        return deletePatient();
      } else if (
        url.match(/\/patients\/\d+\/quiz\/\d+$/) &&
        method === 'POST'
      ) {
        return addQuizToPatient();
      } else if (url.match(/\/patients\/\d+\/quiz$/) && method === 'GET') {
        return getPatientQuiz();
      }
      // family members
      else if (url.match(/\/patients\/\d+\/family$/) && method === 'GET') {
        return getPatientFamily();
      } else if (url.match(/\/patients\/\d+\/family$/) && method === 'POST') {
        return addPatientFamily();
      } else if (
        url.match(/\/patients\/\d+\/family\/\d+$/) &&
        method === 'PUT'
      ) {
        return updatePatientFamily();
      } else if (
        url.match(/\/patients\/\d+\/family\/\d+$/) &&
        method === 'DELETE'
      ) {
        return deletePatientFamily();
      }
      // patient accommodation
      else if (
        url.match(/\/patients\/\d+\/accommodation$/) &&
        method === 'POST'
      ) {
        return addAccommodationPatient();
      } else if (
        url.match(/\/patients\/\d+\/accommodation$/) &&
        method === 'GET'
      ) {
        return getPatientAccommodation();
      } else if (
        url.match(/\/patients\/\d+\/accommodation\/\d+$/) &&
        method === 'DELETE'
      ) {
        return deleteAccommodationPatient();
      } else if (url.endsWith('/quiz') && method === 'GET') {
        return getAllQuiz();
      } else if (url.endsWith('/patients') && method === 'GET') {
        return getAllPatient();
      } else if (url.endsWith('/patients') && method === 'POST') {
        return createPatient(body as Patient.Patient);
      }
      // get all accommodations
      else if (url.endsWith('/accommodation') && method === 'GET') {
        return getAllAccommodation();
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
      ).pipe(delay(10)); // delay observable to simulate server api call
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
      }).pipe(materialize(), delay(10), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};

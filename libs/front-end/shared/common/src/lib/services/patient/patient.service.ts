import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, Quiz, RequestWrapper } from '@webonjour/util-interface';
import { api_root, environment } from '@webonjour/shared/environments';
import {
  Accommodation,
  FamilyMember,
  Prisma,
  QuestionResult,
} from '@prisma/client';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;
type Patient = Prisma.PatientGetPayload<Patient.PatientFull>;
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  PATIENT_URL = `${api_root(environment)}/patients/`;
  ACCOMMODATION_URL = `${api_root(environment)}/accommodations/`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<RequestWrapper<Patient[]>> {
    return this.http.get<RequestWrapper<Patient[]>>(this.PATIENT_URL);
  }

  getPatient(id: number): Observable<RequestWrapper<Patient>> {
    return this.http.get<RequestWrapper<Patient>>(this.PATIENT_URL + id);
  }

  createPatient(
    patient: Prisma.PatientCreateInput
  ): Observable<RequestWrapper<Patient>> {
    return this.http.post<RequestWrapper<Patient>>(this.PATIENT_URL, patient);
  }

  updatePatient(
    patientId: number,
    patient: Prisma.PatientUpdateInput
  ): Observable<RequestWrapper<Patient>> {
    return this.http.put<RequestWrapper<Patient>>(
      this.PATIENT_URL + patientId,
      patient
    );
  }

  deletePatient(id: number): Observable<RequestWrapper<null>> {
    return this.http.delete<RequestWrapper<null>>(this.PATIENT_URL + id);
  }

  getPatientQuiz(id: number): Observable<RequestWrapper<Quiz[]>> {
    return this.http.get<RequestWrapper<Quiz[]>>(
      this.PATIENT_URL + id + '/quiz'
    );
  }

  addPatientQuiz(id: number, quizId: number): Observable<RequestWrapper<Quiz>> {
    return this.http.post<RequestWrapper<Quiz>>(
      this.PATIENT_URL + id + '/quiz/' + quizId,
      { quizId }
    );
  }

  deletePatientQuiz(
    id: number,
    quizId: number
  ): Observable<RequestWrapper<Quiz>> {
    return this.http.delete<RequestWrapper<Quiz>>(
      this.PATIENT_URL + id + '/quiz/' + quizId
    );
  }

  getPatientFamily(id: number): Observable<RequestWrapper<FamilyMember[]>> {
    return this.http.get<RequestWrapper<FamilyMember[]>>(
      this.PATIENT_URL + id + '/familyMember'
    );
  }

  getPatientAccommodation(
    id: number
  ): Observable<RequestWrapper<Accommodation[]>> {
    return this.http.get<RequestWrapper<Accommodation[]>>(
      this.PATIENT_URL + id + '/accommodation'
    );
  }

  addPatientAccommodation(
    id: number,
    accommodationId: number
  ): Observable<RequestWrapper<Accommodation>> {
    return this.http.post<RequestWrapper<Accommodation>>(
      this.PATIENT_URL + id + '/accommodation/' + accommodationId,
      {}
    );
  }

  deletePatientAccommodation(
    id: number,
    accommodationId: number
  ): Observable<RequestWrapper<Accommodation>> {
    return this.http.delete<RequestWrapper<Accommodation>>(
      this.PATIENT_URL + id + '/accommodation/' + accommodationId
    );
  }

  getAllAccommodations(): Observable<RequestWrapper<Accommodation[]>> {
    return this.http.get<RequestWrapper<Accommodation[]>>(
      this.ACCOMMODATION_URL
    );
  }

  getPatientQuestionResults(
    id: number
  ): Observable<RequestWrapper<QuestionResult[]>> {
    return this.http.get<RequestWrapper<QuestionResult[]>>(
      this.PATIENT_URL + id + '/questionResult'
    );
  }

  getPatientAggregatedQuestionResults(
    id: number
  ): Observable<RequestWrapper<Patient.AggregatedQuestionResult>> {
    return this.http.get<RequestWrapper<Patient.AggregatedQuestionResult>>(
      this.PATIENT_URL + id + '/questionResult/aggregated'
    );
  }
}

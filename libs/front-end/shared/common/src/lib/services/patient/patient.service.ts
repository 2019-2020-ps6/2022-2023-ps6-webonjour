import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, Quiz, RequestWrapper } from '@webonjour/util-interface';
import { Accommodation, FamilyMember, Prisma } from '@prisma/client';
import { environment } from '@webonjour/shared/environments';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;
type Patient = Prisma.PatientGetPayload<Patient.PatientFull>;
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  API_URL = `http://${environment.api.host}:${environment.api.port}`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<RequestWrapper<Patient[]>> {
    return this.http.get<RequestWrapper<Patient[]>>(this.API_URL + '/patients');
  }

  getPatient(id: number): Observable<RequestWrapper<Patient>> {
    return this.http.get<RequestWrapper<Patient>>(
      this.API_URL + '/patients/' + id
    );
  }

  createPatient(
    patient: Prisma.PatientCreateInput
  ): Observable<RequestWrapper<Patient>> {
    return this.http.post<RequestWrapper<Patient>>(
      this.API_URL + '/patients',
      patient
    );
  }

  updatePatient(
    patientId: number,
    patient: Prisma.PatientUpdateInput
  ): Observable<RequestWrapper<Patient>> {
    return this.http.put<RequestWrapper<Patient>>(
      this.API_URL + '/patients/' + patientId,
      patient
    );
  }

  deletePatient(id: number): Observable<RequestWrapper<null>> {
    return this.http.delete<RequestWrapper<null>>(
      this.API_URL + '/patients/' + id
    );
  }

  getPatientQuiz(id: number): Observable<RequestWrapper<Quiz[]>> {
    return this.http.get<RequestWrapper<Quiz[]>>(
      this.API_URL + '/patients/' + id + '/quiz'
    );
  }

  addPatientQuiz(id: number, quizId: number): Observable<RequestWrapper<Quiz>> {
    return this.http.post<RequestWrapper<Quiz>>(
      this.API_URL + '/patients/' + id + '/quiz/' + quizId,
      { quizId }
    );
  }

  deletePatientQuiz(
    id: number,
    quizId: number
  ): Observable<RequestWrapper<Quiz>> {
    return this.http.delete<RequestWrapper<Quiz>>(
      this.API_URL + '/patients/' + id + '/quiz/' + quizId
    );
  }

  getPatientFamily(id: number): Observable<RequestWrapper<FamilyMember[]>> {
    return this.http.get<RequestWrapper<FamilyMember[]>>(
      this.API_URL + '/patients/' + id + '/family'
    );
  }

  getPatientAccommodation(
    id: number
  ): Observable<RequestWrapper<Accommodation[]>> {
    return this.http.get<RequestWrapper<Accommodation[]>>(
      this.API_URL + '/patients/' + id + '/accommodation'
    );
  }

  addPatientAccommodation(
    id: number,
    accommodationId: number
  ): Observable<RequestWrapper<Accommodation>> {
    return this.http.post<RequestWrapper<Accommodation>>(
      this.API_URL + '/patients/' + id + '/accommodation',
      { id: accommodationId }
    );
  }

  deletePatientAccommodation(
    id: number,
    accommodationId: number
  ): Observable<RequestWrapper<Accommodation>> {
    return this.http.delete<RequestWrapper<Accommodation>>(
      this.API_URL + '/patients/' + id + '/accommodation/' + accommodationId
    );
  }

  getAllAccommodations(): Observable<RequestWrapper<Accommodation[]>> {
    return this.http.get<RequestWrapper<Accommodation[]>>(
      this.API_URL + '/accommodation'
    );
  }
}

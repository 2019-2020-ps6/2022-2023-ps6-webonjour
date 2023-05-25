import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, Quiz, RequestWrapper } from '@webonjour/util-interface';
import { Prisma } from '@prisma/client';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;
type Patient = Prisma.PatientGetPayload<Patient.PatientFull>;
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  API_URL = 'http://localhost:3333';

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

  getPatientFamily(
    id: number
  ): Observable<RequestWrapper<Patient.FamilyMember[]>> {
    return this.http.get<RequestWrapper<Patient.FamilyMember[]>>(
      this.API_URL + '/patients/' + id + '/family'
    );
  }

  addPatientFamily(
    id: number,
    familyMember: Patient.FamilyMember
  ): Observable<RequestWrapper<Patient.FamilyMember>> {
    return this.http.post<RequestWrapper<Patient.FamilyMember>>(
      this.API_URL + '/patients/' + id + '/family',
      familyMember
    );
  }

  deletePatientFamily(
    id: number,
    familyId: string
  ): Observable<RequestWrapper<Patient.FamilyMember>> {
    return this.http.delete<RequestWrapper<Patient.FamilyMember>>(
      this.API_URL + '/patients/' + id + '/family/' + familyId
    );
  }

  getPatientAccommodation(
    id: number
  ): Observable<RequestWrapper<Patient.Accommodation[]>> {
    return this.http.get<RequestWrapper<Patient.Accommodation[]>>(
      this.API_URL + '/patients/' + id + '/accommodation'
    );
  }

  addPatientAccommodation(
    id: number,
    accommodationId: string
  ): Observable<RequestWrapper<Patient.Accommodation>> {
    return this.http.post<RequestWrapper<Patient.Accommodation>>(
      this.API_URL + '/patients/' + id + '/accommodation',
      { id: accommodationId }
    );
  }

  deletePatientAccommodation(
    id: number,
    accommodationId: string
  ): Observable<RequestWrapper<Patient.Accommodation>> {
    return this.http.delete<RequestWrapper<Patient.Accommodation>>(
      this.API_URL + '/patients/' + id + '/accommodation/' + accommodationId
    );
  }

  getAllAccommodations(): Observable<RequestWrapper<Patient.Accommodation[]>> {
    return this.http.get<RequestWrapper<Patient.Accommodation[]>>(
      this.API_URL + '/accommodation'
    );
  }

  updateFamilyPatient(patientId: number, familyMember: Patient.FamilyMember) {
    return this.http.put<RequestWrapper<Patient.FamilyMember>>(
      this.API_URL + '/patients/' + patientId + '/family/' + familyMember.id,
      familyMember
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, Quiz, RequestWrapper } from '@webonjour/util-interface';
import { Prisma } from '@prisma/client';

type Quiz = Prisma.QuizGetPayload<Quiz.QuizWithQuestions>;

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  API_URL = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<RequestWrapper<Patient.Patient[]>> {
    return this.http.get<RequestWrapper<Patient.Patient[]>>(
      this.API_URL + '/patients'
    );
  }

  getPatient(id: string): Observable<RequestWrapper<Patient.Patient>> {
    return this.http.get<RequestWrapper<Patient.Patient>>(
      this.API_URL + '/patients/' + id
    );
  }

  createPatient(
    patient: Patient.Patient
  ): Observable<RequestWrapper<Patient.Patient>> {
    return this.http.post<RequestWrapper<Patient.Patient>>(
      this.API_URL + '/patients',
      patient
    );
  }

  updatePatient(
    patient: Patient.Patient
  ): Observable<RequestWrapper<Patient.Patient>> {
    return this.http.put<RequestWrapper<Patient.Patient>>(
      this.API_URL + '/patients/' + patient.id,
      patient
    );
  }

  deletePatient(id: string): Observable<RequestWrapper<Patient.Patient>> {
    return this.http.delete<RequestWrapper<Patient.Patient>>(
      this.API_URL + '/patients/' + id
    );
  }

  getPatientQuiz(id: string): Observable<RequestWrapper<Quiz[]>> {
    return this.http.get<RequestWrapper<Quiz[]>>(
      this.API_URL + '/patients/' + id + '/quiz'
    );
  }

  addPatientQuiz(id: string, quizId: number): Observable<RequestWrapper<Quiz>> {
    return this.http.post<RequestWrapper<Quiz>>(
      this.API_URL + '/patients/' + id + '/quiz/' + quizId,
      { quizId }
    );
  }

  deletePatientQuiz(
    id: string,
    quizId: number
  ): Observable<RequestWrapper<Quiz>> {
    return this.http.delete<RequestWrapper<Quiz>>(
      this.API_URL + '/patients/' + id + '/quiz/' + quizId
    );
  }

  getPatientFamily(
    id: string
  ): Observable<RequestWrapper<Patient.FamilyMember[]>> {
    return this.http.get<RequestWrapper<Patient.FamilyMember[]>>(
      this.API_URL + '/patients/' + id + '/family'
    );
  }

  addPatientFamily(
    id: string,
    familyMember: Patient.FamilyMember
  ): Observable<RequestWrapper<Patient.FamilyMember>> {
    return this.http.post<RequestWrapper<Patient.FamilyMember>>(
      this.API_URL + '/patients/' + id + '/family',
      familyMember
    );
  }

  deletePatientFamily(
    id: string,
    familyId: string
  ): Observable<RequestWrapper<Patient.FamilyMember>> {
    return this.http.delete<RequestWrapper<Patient.FamilyMember>>(
      this.API_URL + '/patients/' + id + '/family/' + familyId
    );
  }

  getPatientAccommodation(
    id: string
  ): Observable<RequestWrapper<Patient.Accommodation[]>> {
    return this.http.get<RequestWrapper<Patient.Accommodation[]>>(
      this.API_URL + '/patients/' + id + '/accommodation'
    );
  }

  addPatientAccommodation(
    id: string,
    accommodationId: string
  ): Observable<RequestWrapper<Patient.Accommodation>> {
    return this.http.post<RequestWrapper<Patient.Accommodation>>(
      this.API_URL + '/patients/' + id + '/accommodation',
      { id: accommodationId }
    );
  }

  deletePatientAccommodation(
    id: string,
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

  updateFamilyPatient(patientId: string, familyMember: Patient.FamilyMember) {
    return this.http.put<RequestWrapper<Patient.FamilyMember>>(
      this.API_URL + '/patients/' + patientId + '/family/' + familyMember.id,
      familyMember
    );
  }
}

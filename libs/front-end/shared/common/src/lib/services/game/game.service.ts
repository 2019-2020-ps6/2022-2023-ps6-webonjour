import { EventEmitter, Injectable, Output } from '@angular/core';
import { quizMocks } from '@webonjour/data-access-fake-backend';
import { Quiz } from '@webonjour/util-interface';
import { Patient } from '@webonjour/util-interface';
import { PatientService } from '../patient/patient.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  quizzes: Quiz.Quiz[] = [];
  currentQuizIndex = '1';
  currentQuestionIndex = 0;
  timer!: number;
  score = 0;
  currentPlayer: Patient.Patient = {
    id: '1',
    firstName: '',
    lastName: '',
    age: 0,
    profilePictureUrl: '',
    description: '',
    diseaseStage: Quiz.DiseaseStage.STAGE_1,
    lastQuizDate: new Date(),
    successRate: 0,
  };
  @Output() currentQuestion = new EventEmitter<Quiz.Question>();
  accomodation!: Patient.Accommodation[];

  constructor(private patientService: PatientService) {
    this.quizzes = quizMocks.quizList;
    this.currentQuizIndex = '0';
    this.currentQuestionIndex = 0;
  }

  get quizzesList() {
    return this.quizzes;
  }

  get player() {
    return this.currentPlayer;
  }

  incrementScore() {
    this.score++;
  }

  get scoreValue() {
    return this.score + '/' + this.getCurrentQuiz().questions.length;
  }

  selectQuiz(quizIndex: string) {
    this.currentQuizIndex = quizIndex;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.currentQuestion.emit(this.getCurrentQuestion());
  }

  getCurrentQuiz() {
    // observable
    return this.quizzes.filter((quiz) => quiz.id === this.currentQuizIndex)[0];
  }

  getCurrentQuestion() {
    return this.getCurrentQuiz().questions[this.currentQuestionIndex];
  }

  startTimer() {
    this.timer = 0;
    setInterval(() => {
      this.timer++;
    });
  }

  endTimer() {
    return this.timer;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.currentQuestion.emit(this.getCurrentQuestion());
  }

  isLastQuestion() {
    return !(
      this.currentQuestionIndex <
      this.getCurrentQuiz().questions.length - 1
    );
  }

  setCurrentPatient(patient: Patient.Patient) {
    this.currentPlayer = patient;
    this.patientService
      .getPatientAccommodation(patient.id)
      .subscribe((accomodation) => {
        this.accomodation = accomodation.data;
      });
  }

  get patient() {
    return this.currentPlayer;
  }
}

import { EventEmitter, Injectable, Output } from '@angular/core';
import { quizMocks } from '@webonjour/data-access-fake-backend';
import { Quiz } from '@webonjour/util-interface';
import { Patient } from '@webonjour/util-interface';
import { PatientService } from '../patient/patient.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  quizzes: Quiz.Quiz[] = [
    {
      id: '1',
      title: 'Les chevaux célèbres',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Horse_%284159728870%29.jpg/207px-Horse_%284159728870%29.jpg',
      stage: Quiz.DiseaseStage.STAGE_3,
      questions: [
        {
          title: "Quel était la couleur du cheval blanc d'Henri IV ?",
          answers: [
            {
              text: 'Blanc',
              image:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png',
              isCorrect: true,
            },
            {
              text: 'Noir',
              image:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/512px-Solid_black.svg.png',
              isCorrect: false,
            },
            {
              text: 'Rouge',
              image:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png',
              isCorrect: false,
            },
            {
              text: 'Vert',
              image:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Solid_green.svg/512px-Solid_green.svg.png',
              isCorrect: false,
            },
          ],
          clues: [
            { text: "C'est la couleur de la neige" },
            {
              text: 'Ce cheval était connu pour sa robe blanche et son allure majestueuse.',
            },
            {
              text: "Cette couleur ne fait pas partie de l'arc-en-ciel mais en est la combinaison.",
            },
            {
              image:
                'https://i0.wp.com/passionchateau.fr/wp-content/uploads/2015/01/77-5-Fraise-Mauzaisse-Henri-IV.jpg',
            },
          ],
        },
        {
          title: 'Quel était le nom du cheval de Napoléon Bonaparte ?',
          answers: [
            {
              text: 'Marengo',
              isCorrect: true,
            },
            {
              text: 'Roquette',
              isCorrect: false,
            },
            {
              text: 'Jappeloup',
              isCorrect: false,
            },
          ],
          clues: [
            {
              text: "Le nom de ce cheval vient d'une bataille qui a eu lieu en 1800.",
            },
          ],
        },
        {
          title: "Comment s'appelait le cheval de Zorro ?",
          answers: [
            {
              text: 'Tornado',
              isCorrect: true,
            },
            {
              text: 'Apache',
              isCorrect: false,
            },
            {
              text: 'Faucon',
              isCorrect: false,
            },
          ],
          clues: [
            { text: 'Ce cheval était connu pour sa robe noire et blanche.' },
          ],
        },
        {
          title: 'Quel était le nom du cheval de la reine Élisabeth II ?',
          answers: [
            {
              text: 'Estimate',
              isCorrect: false,
            },
            {
              text: 'Highclere',
              isCorrect: false,
            },
            {
              text: 'Burmese',
              isCorrect: true,
            },
          ],
          clues: [
            {
              text: "Ce cheval a été offert à la reine Élisabeth II par l'armée australienne.",
            },
          ],
        },
      ],
    },
  ];
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

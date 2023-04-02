import { Injectable } from '@angular/core';
import { quizMocks } from '@webonjour/data-access-fake-backend';
import { Quiz } from '@webonjour/util-interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  quizzes: Quiz.Quiz[];
  currentQuizIndex: number;
  currentQuestionIndex: number;
  timer!: number;

  constructor() {
    this.quizzes = quizMocks.quizList;
    this.currentQuizIndex = 0;
    this.currentQuestionIndex = 0;
  }

  get quizzesList() {
    return this.quizzes;
  }

  selectQuiz(quizIndex: number) {
    this.currentQuizIndex = quizIndex;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuiz() {
    return this.quizzes.filter(
      (quiz) => quiz.id === this.currentQuizIndex.toString()
    )[0];
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
  }
}

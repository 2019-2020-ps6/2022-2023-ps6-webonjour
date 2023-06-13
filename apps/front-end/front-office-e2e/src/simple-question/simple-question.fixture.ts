import { Locator, Page } from '@playwright/test';
import { QuizSelectionFixture } from '../quiz-selection/quiz-selection.fixture';

export class SimpleQuestionSelectionFixture {
  readonly answers: Locator;
  readonly title: Locator;

  constructor(readonly page: Page) {
    this.answers = page.locator('.answer-button');
    this.title = page.locator('webonjour-game-question').locator('h1');
  }

  async goto(floor: number, patient: number, quiz: number) {
    const quiz_fixture = new QuizSelectionFixture(this.page);
    await quiz_fixture.goto(floor, patient);
    await quiz_fixture.selectQuiz(quiz);
    await this.page.waitForSelector('webonjour-game-question');
  }

  async selectAnswer(quizNumber: number) {
    await this.answers.nth(quizNumber).click();
  }
}

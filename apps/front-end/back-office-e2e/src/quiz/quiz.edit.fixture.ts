import { Locator, Page } from '@playwright/test';
import { QuizFixture } from './quiz.fixture';

export class QuizEditFixture {
  readonly deleteQuizButton: Locator;

  constructor(readonly page: Page) {
    this.deleteQuizButton = page.locator('button:has-text("Supprimer")');
  }

  async goto(quiz: number) {
    const quizFixture = new QuizFixture(this.page);
    await quizFixture.goto();
    await quizFixture.quizzes.nth(quiz).click();
  }

  async deleteQuiz() {
    await this.deleteQuizButton.click();
    // wait for the page to reload
    const quizFixture = new QuizFixture(this.page);
    await this.page.waitForLoadState('networkidle');
    await quizFixture.quizzes.first().waitFor({
      state: 'attached',
    });
  }
}

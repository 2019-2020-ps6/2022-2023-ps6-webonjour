import { Locator, Page } from '@playwright/test';
import { QuizFixture } from './quiz.fixture';

export class QuizEditFixture {
  readonly deleteQuizButton: Locator;
  readonly quizGeneralTitle: Locator;
  private quizGeneralImage: Locator;
  private quizUpdateButton: Locator;
  readonly questions: Locator;

  constructor(readonly page: Page) {
    this.deleteQuizButton = page.locator('button:has-text("Supprimer")');
    this.quizGeneralTitle = page.locator(
      'webonjour-quiz-edit-general input[formcontrolname="title"]'
    );
    this.quizGeneralImage = page.locator(
      'webonjour-quiz-edit-general input[type="file"]'
    );
    this.quizUpdateButton = page.locator(
      'webonjour-quiz-edit-general button[type="submit"]'
    );

    this.questions = page.locator('webonjour-question-list tbody tr');
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
  async updateQuiz(title: string, image?: string) {
    await this.quizGeneralTitle.fill(title);
    if (image) {
      console.log(image);
      await this.quizGeneralImage.setInputFiles(image);
    }
    await this.quizUpdateButton.click();
    // wait for the page to reload
    await this.page.waitForLoadState('networkidle');
  }
}

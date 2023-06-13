import { Locator, Page } from '@playwright/test';
import { MenuFixture } from '../menu/menu.fixture';
import { QuizFixture } from './quiz.fixture';

export class QuizAddFixture {
  readonly quizTitle: Locator;
  readonly quizImage: Locator;
  private submit: Locator;
  readonly addQuizButton: Locator;

  constructor(readonly page: Page) {
    this.addQuizButton = page.locator('button:has-text("Ajouter un quiz")');
    this.quizTitle = page.locator('input[formcontrolname="title"]');
    this.quizImage = page.locator('input[type="file"]');
    this.submit = page.locator('button[type="submit"]');
  }

  async goto() {
    const menuFixture = new MenuFixture(this.page);
    await menuFixture.goto();
    await menuFixture.quizButton.click();
    await this.addQuizButton.click();
  }

  async addQuiz(title: string, image?: string) {
    await this.quizTitle.fill(title);
    if (image) {
      console.log(image);
      await this.quizImage.setInputFiles(image);
    }
    await this.submit.click();
    // wait for the page to reload
    const quizFixture = new QuizFixture(this.page);
    await this.page.waitForLoadState('networkidle');
    await quizFixture.quizzes.first().waitFor({
      state: 'visible',
    });
  }
}

import { Locator, Page } from '@playwright/test';
import { MenuFixture } from '../menu/menu.fixture';

export class QuizFixture {
  readonly quizzes: Locator;
  readonly addQuizButton: Locator;

  constructor(readonly page: Page) {
    this.quizzes = page.locator('webonjour-quiz-list tbody tr');
    this.addQuizButton = page.locator('button:has-text("Ajouter un quiz")');
  }

  async goto() {
    const menuFixture = new MenuFixture(this.page);
    await menuFixture.goto();
    await menuFixture.quizButton.click();
  }
}

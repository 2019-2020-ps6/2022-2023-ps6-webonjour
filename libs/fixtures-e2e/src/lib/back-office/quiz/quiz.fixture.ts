import { Locator, Page } from '@playwright/test';
import { MenuFixture } from '../menu/menu.fixture';

export class QuizFixture {
  readonly quizzes: Locator;

  constructor(readonly page: Page) {
    this.quizzes = page.locator('webonjour-quiz-list tbody tr');
  }

  async goto() {
    const menuFixture = new MenuFixture(this.page);
    await menuFixture.goto();
  }
}

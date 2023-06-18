import { Locator, Page } from '@playwright/test';
import { LoginFixture } from '../login/login.fixture';

export class MenuFixture {
  readonly patientButton: Locator;
  readonly quizButton: Locator;

  constructor(readonly page: Page) {
    this.patientButton = page.locator('.nav-link').last();
    this.quizButton = page.locator('.nav-link').first();
  }

  async goto() {
    const loginFixture = new LoginFixture(this.page);
    await loginFixture.goto();
    await loginFixture.login('email@email.com', 'password');
  }
}

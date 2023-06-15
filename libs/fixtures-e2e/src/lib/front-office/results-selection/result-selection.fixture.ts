import { Locator, Page } from '@playwright/test';
import { SimpleQuestionSelectionFixture } from '../simple-question/simple-question.fixture';

export class ResultSelectionFixture {
  readonly score: Locator;
  readonly restart_button: Locator;
  readonly message: Locator;

  constructor(readonly page: Page) {
    this.score = page.locator('.result');
    this.restart_button = page.locator('.replay');
  }

  async goto(floor: number, patient: number, quiz: number) {
    const question_fixture = new SimpleQuestionSelectionFixture(this.page);
    await question_fixture.goto(floor, patient, quiz);

    while (await this.page.locator('.answer-button').first().isVisible()) {
      await this.page.locator('.answer-button').first().click({ timeout: 200 });
      // wait for the page to reload
      await this.page.waitForTimeout(100);
    }
  }

  async restart() {
    await this.restart_button.click();
  }
}

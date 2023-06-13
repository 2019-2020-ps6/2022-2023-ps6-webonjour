import { Locator, Page } from '@playwright/test';
import { QuestionSelectionFixture } from '../question/question.fixture';

export class HelpPageFixture {
  readonly button: Locator;
  readonly clue: Locator;
  readonly backButton: Locator;
  readonly title: Locator;

  constructor(readonly page: Page) {
    this.button = page.locator('.help-button');
    this.clue = page
      .locator('webonjour-help-page')
      .locator('.clue-container')
      .locator('p');
    this.backButton = page
      .locator('webonjour-help-page')
      .locator('is-horizontal-align')
      .locator('a');
    this.title = page
      .locator('webonjour-help-page')
      .locator('clue-header')
      .locator('p');
  }

  async goto(floor: number, patient: number, quiz: number) {
    const quiz_fixture = new QuestionSelectionFixture(this.page);
    await quiz_fixture.goto(floor, patient, quiz);
    await this.clickHelpButton();
    await this.page.waitForSelector('webonjour-help-page');
  }

  async clickHelpButton() {
    await this.button.click();
  }
}

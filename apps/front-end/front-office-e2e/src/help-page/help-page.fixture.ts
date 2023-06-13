import { Locator, Page } from '@playwright/test';
import { QuestionSelectionFixture } from '../question/question.fixture';

export class HelpPageFixture {
  readonly button: Locator;
  readonly clue: Locator;
  readonly backButton: Locator;
  readonly title: Locator;

  constructor(readonly page: Page) {
    this.button = page.locator('.help-button');
    this.clue = page.locator('.clue-container').locator('p');
    // button containing Retourner à la question
    this.backButton = page.getByText('Retourner à la question');
    this.title = page.locator('.clue-header').locator('p').first();
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

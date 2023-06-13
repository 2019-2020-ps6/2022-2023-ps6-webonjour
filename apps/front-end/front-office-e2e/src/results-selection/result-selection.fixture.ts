import { Locator, Page } from '@playwright/test';
import { SimpleQuestionSelectionFixture } from '../simple-question/simple-question.fixture';

export class ResultSelectionFixture {
  readonly score: Locator;
  readonly restart_button: Locator;

  constructor(readonly page: Page) {
    this.score = page.locator('.result');
    this.restart_button = page.locator('.replay');
  }

  async goto(floor: number, patient: number, quiz: number) {
    const question_fixture = new SimpleQuestionSelectionFixture(this.page);
    await question_fixture.goto(floor, patient, quiz);

    // click on the first answer while there is a question (wait between each click)
    while ((await this.page.locator('webonjour-quiz-results').count()) === 0) {
      if ((await this.page.locator('webonjour-game-question').count()) === 0) {
        break;
      }

      await question_fixture.selectAnswer(0);
      await this.page.waitForLoadState('networkidle');
    }
  }

  async restart() {
    await this.restart_button.click();
  }
}

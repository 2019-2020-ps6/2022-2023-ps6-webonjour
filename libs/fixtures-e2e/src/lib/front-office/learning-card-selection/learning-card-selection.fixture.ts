import { Locator, Page } from '@playwright/test';
import { QuestionSelectionFixture } from '../question/question.fixture';

export class LearningCardSelectionFixture {
  readonly title: Locator;

  constructor(readonly page: Page) {
    this.title = page.locator('webonjour-learning').locator('h1').first();
  }

  async goto() {
    // select the first floor
    const quiz_fixture: QuestionSelectionFixture = new QuestionSelectionFixture(
      this.page
    );
    await quiz_fixture.goto(1, 0, 0);
    await quiz_fixture.selectAnswer(1);
    await quiz_fixture.selectAnswer(2);
  }
}

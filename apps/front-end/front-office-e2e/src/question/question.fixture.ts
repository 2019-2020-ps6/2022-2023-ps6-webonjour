import { Locator, Page } from '@playwright/test';
import { QuizSelectionFixture } from '../quiz-selection/quiz-selection.fixture';

export class QuestionSelectionFixture {
  readonly answers: Locator;
  readonly title: Locator;

  constructor(readonly page: Page) {
    this.answers = page.locator('.answer-button').or(page.locator('.action'));
    this.title = page
      .locator('webonjour-game-question')
      .locator('h1')
      .or(
        page
          .locator('webonjour-drag-and-drop')
          .locator('.question-title')
          .locator('h2')
      );
  }

  private async gotoIndex(floor: number, patient: number, quiz: number) {
    const quiz_fixture = new QuizSelectionFixture(this.page);
    await quiz_fixture.goto(floor, patient);
    await quiz_fixture.selectQuiz(quiz);
  }

  async goto(floor: number, patient: number, quiz: number) {
    await this.gotoIndex(floor, patient, quiz);

    await this.page.waitForSelector('.question-title', { timeout: 100 });
  }

  async selectAnswer(quizNumber: number) {
    await this.answers.nth(quizNumber).click();
  }

  async moveDragAndDropAnswer(current_index: number, new_index: number) {
    const current_element = this.answers.nth(current_index);
    const new_element = this.answers.nth(new_index);

    // Don't change this code. `dragTo` is not working.
    await current_element.hover();
    await this.page.mouse.down();
    const box = await new_element.boundingBox();
    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await new_element.hover();
    await this.page.mouse.up();
  }
}

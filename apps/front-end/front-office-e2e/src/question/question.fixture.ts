import { Locator, Page } from '@playwright/test';
import { QuizSelectionFixture } from '../quiz-selection/quiz-selection.fixture';

export class QuestionSelectionFixture {
  readonly answers: Locator;
  readonly title: Locator;

  CLASSIC_ANSWER_LOCATOR = '.answer-button';
  DRAG_AND_DROP_ANSWER_LOCATOR = '.action';

  constructor(readonly page: Page) {
    this.answers = page
      .locator(this.CLASSIC_ANSWER_LOCATOR)
      .or(page.locator(this.DRAG_AND_DROP_ANSWER_LOCATOR));
    this.title = page
      .locator('.question-title')
      .or(page.locator('.question-title').locator('h2'));
  }

  private async gotoIndex(floor: number, patient: number, quiz: number) {
    const quiz_fixture = new QuizSelectionFixture(this.page);
    await quiz_fixture.goto(floor, patient);
    await quiz_fixture.selectQuiz(quiz);
  }

  async goto(floor: number, patient: number, quiz: number) {
    await this.gotoIndex(floor, patient, quiz);
    await this.page.waitForSelector(this.CLASSIC_ANSWER_LOCATOR);
  }

  async gotoDragndrop(floor: number, patient: number, quiz: number) {
    await this.gotoIndex(floor, patient, quiz);
    await this.page.waitForSelector(this.DRAG_AND_DROP_ANSWER_LOCATOR);
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

import { Locator, Page } from '@playwright/test';
import { QuizSelectionFixture } from '../quiz-selection/quiz-selection.fixture';

export class QuestionSelectionFixture {
  readonly answers: Locator;
  readonly title: Locator;
  readonly skip_button: Locator;

  constructor(readonly page: Page) {
    this.answers = page.locator('.answer-button').or(page.locator('.action'));
    this.skip_button = page.locator('.skip-button');
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

    await this.page.waitForSelector('.question-title', { timeout: 1000 });
  }

  async selectAnswer(quizNumber: number) {
    await this.answers.nth(quizNumber).click();
  }

  async dragTo(current: Locator, next: Locator) {
    // Don't change this code. `dragTo` is not working.
    await current.hover();
    await this.page.mouse.down();
    const box = await next.boundingBox();
    // move to the BOTTOM RIGHT of the element
    await this.page.mouse.move(box.x + box.width, box.y + box.height);
    //await this.page.mouse.move(box.x + box.width, box.y + box.height);
    await next.hover();
    await this.page.mouse.up();
  }

  async moveDragAndDropAnswer(current_index: number, new_index: number) {
    const current_element = this.answers.nth(current_index);
    const new_element = this.answers.nth(new_index);

    await this.dragTo(current_element, new_element);
  }

  async validateDragAndDrop() {
    const answerComponent = this.page.locator('.answer-list');
    const count = await this.answers.count();
    while (!(await this.isActionListEmpty())) {
      console.log('dragging', this.answers.first());
      const first = await this.answers.nth(0);
      await this.dragTo(first, answerComponent);
    }
    await this.page.click('.validate-button');
  }

  async isActionListEmpty() {
    const actionList = await this.page.locator('.action-list');
    return (await actionList.innerText()) === '';
  }

  async skipQuestion() {
    await this.skip_button.click();
    await this.page.waitForLoadState('networkidle');
  }
}

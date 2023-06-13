import { Locator, Page } from '@playwright/test';

export class QuestionAddFixture {
  readonly title: Locator;
  readonly image: Locator;
  readonly submit: Locator;
  readonly type: Locator;
  private addQuestionButton: Locator;

  constructor(readonly page: Page) {
    this.title = page.locator(
      'webonjour-question-edit-general input[formcontrolname="title"]'
    );
    this.image = page.locator(
      'webonjour-question-edit-general input[type="file"]'
    );
    this.submit = page.locator(
      'webonjour-question-edit-general button[type="submit"]'
    );
    this.type = page.locator(
      'webonjour-question-edit-general select[formcontrolname="type"]'
    );
    this.addQuestionButton = page.locator(
      'button:has-text("Ajouter une question")'
    );
  }

  async addQuestion(title: string, type: string, image?: string) {
    await this.addQuestionButton.click();
    await this.title.fill(title);
    if (image) {
      await this.image.setInputFiles(image);
    }
    if (type) {
      await this.type.selectOption({ label: type });
    }
    await this.submit.click();
    // wait for the page to reload
    await this.page.waitForLoadState('networkidle');
  }
}

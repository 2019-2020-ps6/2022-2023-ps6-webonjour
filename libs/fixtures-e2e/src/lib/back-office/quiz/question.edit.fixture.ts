import { Locator, Page } from '@playwright/test';

export class QuestionEditFixture {
  readonly deleteQuestionButton: Locator;
  readonly questionGeneralTitle: Locator;
  private questionGeneralImage: Locator;
  private questionGeneralType: Locator;
  private questionUpdateButton: Locator;
  readonly clues: Locator;
  readonly answerAddButton: Locator;

  constructor(readonly page: Page) {
    this.deleteQuestionButton = page.locator(
      'button:has-text("Supprimer la question")'
    );
    this.questionGeneralTitle = page.locator(
      'webonjour-question-edit-general input[formcontrolname="title"]'
    );
    this.questionGeneralImage = page.locator(
      'webonjour-question-edit-general input[type="file"]'
    );
    this.questionUpdateButton = page.locator(
      'webonjour-question-edit-general button[type="submit"]'
    );
    this.questionGeneralType = page.locator(
      'webonjour-question-edit-general select[formcontrolname="type"]'
    );

    this.clues = page.locator('webonjour-question-clue tbody tr');
  }

  async deleteQuestion() {
    await this.page.waitForLoadState('networkidle');
    await this.deleteQuestionButton.click();
    // wait for the page to reload
    await this.page.waitForResponse((response) => {
      return response.url().includes('questions') && response.status() === 200;
    });
  }

  async updateQuestion(title: string, type?: string, image?: string) {
    await this.page.waitForLoadState('networkidle');
    await this.questionGeneralTitle.fill(title);
    if (image) {
      await this.questionGeneralImage.setInputFiles(image);
    }
    if (type) {
      await this.questionGeneralType.selectOption({ label: type });
    }
    await this.questionUpdateButton.click();
    // wait for the page to reload
    await this.page.waitForResponse((response) => {
      return response.url().includes('questions') && response.status() === 200;
    });
  }
}

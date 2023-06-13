import { Locator, Page } from '@playwright/test';

export class AnswerFixture {
  readonly text: Locator;
  readonly isCorrect: Locator;
  readonly submit: Locator;
  readonly image: Locator;
  readonly answerAddButton: Locator;
  readonly answers: Locator;

  constructor(readonly page: Page) {
    this.answerAddButton = page.locator(
      'button:has-text("Ajouter une réponse")'
    );
    this.text = page.locator(
      'webonjour-question-answer-add-popup input[formcontrolname="text"]'
    );
    this.image = page.locator(
      'webonjour-question-answer-add-popup input[type="file"]'
    );
    this.submit = page.locator(
      'webonjour-question-answer-add-popup button[type="submit"]'
    );
    this.isCorrect = page.locator(
      'webonjour-question-answer-add-popup input[type="checkbox"]'
    );
    this.answers = page.locator('webonjour-question-answer tbody tr');
  }

  async addAnswer(text: string, isCorrect: boolean, image?: string) {
    await this.answerAddButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.text.fill(text);
    if (image) {
      await this.image.setInputFiles(image);
    }
    if (isCorrect) {
      await this.isCorrect.check();
    }
    await this.submit.click();
    // wait for the page to reload
    await this.page.waitForLoadState('networkidle');
  }

  async updateAnswer(
    index: number,
    text: string,
    isCorrect: boolean,
    image?: string
  ) {
    await this.page.waitForLoadState('networkidle');
    const answer = await this.answers.nth(index);
    const updateButton = await answer.locator('button:has-text("Modifier")');
    await updateButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.text.fill(text);
    if (image) {
      await this.image.setInputFiles(image);
    }
    if (isCorrect) {
      await this.isCorrect.check();
    }
    await this.submit.click();
    // wait for the page to reload
    await this.page.waitForLoadState('networkidle');
  }

  async deleteAnswer(index: number) {
    await this.page.waitForLoadState('networkidle');
    const answer = await this.answers.nth(index);
    const deleteButton = await answer.locator('button:has-text("Supprimer")');
    await deleteButton.click();
    // wait for the page to reload
    await this.page.waitForLoadState('networkidle');
  }
}

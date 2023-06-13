import { Locator, Page } from '@playwright/test';

export class ClueFixture {
  readonly text: Locator;
  readonly isCorrect: Locator;
  readonly submit: Locator;
  readonly image: Locator;
  readonly clueAddButton: Locator;
  readonly clues: Locator;

  constructor(readonly page: Page) {
    this.clueAddButton = page.locator('button:has-text("Ajouter un indice")');
    this.text = page.locator(
      'webonjour-question-clue-add-popup input[formcontrolname="text"]'
    );
    this.image = page.locator(
      'webonjour-question-clue-add-popup input[type="file"]'
    );
    this.submit = page.locator(
      'webonjour-question-clue-add-popup button[type="submit"]'
    );
    this.clues = page.locator('webonjour-question-clue tbody tr');
  }

  async addClue(text?: string, image?: string) {
    await this.clueAddButton.click();
    await this.text.fill(text);
    if (image) {
      await this.image.setInputFiles(image);
    }
    await this.submit.click();
    // wait for the page to reload
    await this.page.waitForLoadState('networkidle');
  }

  async updateClue(index: number, text: string, image?: string) {
    await this.page.waitForLoadState('networkidle');
    const answer = await this.clues.nth(index);
    const updateButton = await answer.locator('button:has-text("Modifier")');
    await updateButton.click();
    await this.text.fill(text);
    if (image) {
      await this.image.setInputFiles(image);
    }

    await this.submit.click();
    // wait for the page to reload
    await this.page.waitForLoadState('networkidle');
  }

  async deleteClue(index: number) {
    const answer = await this.clues.nth(index);
    const deleteButton = await answer.locator('button:has-text("Supprimer")');
    await deleteButton.click();
    // wait for the page to reload
    await this.page.waitForLoadState('networkidle');
  }
}

import { Locator, Page } from '@playwright/test';
import { PatientFixture } from './patient.fixture';

export class PatientEditFixture {
  readonly deletePatientButton: Locator;
  readonly accommodationsText: Locator;
  readonly accommodations: Locator;
  STAT_QUIZ_PLAYED = 'Quiz joués';
  STAT_BEST_QUIZ = 'Meilleur Quiz';
  STAT_MOST_PLAYED_QUIZ = 'Quiz le plus joué';
  STAT_SUCCESS_RATE = 'Pourcentage de réussite';

  constructor(readonly page: Page) {
    this.deletePatientButton = page.locator(
      'button:has-text("Supprimer le patient")'
    );
    this.accommodationsText = page.locator(
      'webonjour-patient-edit-accommodation cell'
    );
    this.accommodations = page.locator(
      'webonjour-patient-edit-accommodation input'
    );
  }

  async goto(patient: number) {
    const patientFixture = new PatientFixture(this.page);
    await patientFixture.goto();
    await patientFixture.patients.nth(patient).click();
  }

  async deletePatient() {
    await this.page.waitForLoadState('networkidle');
    await this.deletePatientButton.click();
    // wait for the page to reload
    await this.page.waitForResponse((response) => {
      return response.url().includes('patients') && response.status() === 200;
    });
  }

  async assignQuiz(quiz: number) {
    await this.page.click('button:has-text("Ajouter un quiz")');
    const rows = this.page.locator('tbody tr');
    await rows.nth(quiz).locator('button:has-text("Ajouter")').click();
    await this.page.waitForLoadState('networkidle');
    await this.page.press('body', 'Escape');
  }

  async flipAccommodation(accommodation: number, forceState?: boolean) {
    const checkbox = this.accommodations.nth(accommodation);
    if (forceState === undefined) {
      await checkbox.click();
    } else {
      forceState ? await checkbox.check() : await checkbox.uncheck();
    }

    // it doesn't reload automatically
    this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async stats() {
    let res = {};
    for (let el of [
      this.STAT_BEST_QUIZ,
      this.STAT_MOST_PLAYED_QUIZ,
      this.STAT_QUIZ_PLAYED,
      this.STAT_SUCCESS_RATE,
    ]) {
      const title = this.page
        .locator('webonjour-patient-edit-stats')
        .getByText(el, { exact: true });
      const value = (await title.locator('..').allTextContents()).join('');
      res[el] = value.replace(el, '').trim();
    }
    return res;
  }
}

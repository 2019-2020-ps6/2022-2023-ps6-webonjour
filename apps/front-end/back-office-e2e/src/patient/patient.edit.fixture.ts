import { Locator, Page } from '@playwright/test';
import { PatientFixture } from './patient.fixture';

export class PatientEditFixture {
  readonly deletePatientButton: Locator;
  readonly quiz: Locator;

  constructor(readonly page: Page) {
    this.deletePatientButton = page.locator('button:has-text("Supprimer")');
    this.quiz = page.locator('tbody tr .mat-column-Nom-du-Quiz');
  }

  async goto(patient: number) {
    const patientFixture = new PatientFixture(this.page);
    await patientFixture.goto();
    await patientFixture.patients.nth(patient).click();
  }

  async deletePatient() {
    await this.deletePatientButton.click();
    // wait for the page to reload
    const patientFixture = new PatientFixture(this.page);
    await this.page.waitForLoadState('networkidle');
    await patientFixture.patients.first().waitFor({
      state: 'attached',
    });
  }

  async deleteQuiz(quiz: number) {
    const quizDeleteButtons = this.page.locator('button:has-text("Supprimer")');
    await quizDeleteButtons.nth(quiz).click();
    await this.page.waitForLoadState('networkidle');
  }

  async assignQuiz(quiz: number) {
    await this.page.click('text="Ajouter un quiz"');
    await this.page.locator(`text="Ajouter"`).nth(quiz).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.reload(); // get out of the modal which is missing a close button
    await this.page.waitForLoadState('networkidle');
  }
}

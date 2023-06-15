import { Locator, Page } from '@playwright/test';
import { PatientFixture } from './patient.fixture';

export class PatientEditFixture {
  readonly deletePatientButton: Locator;

  constructor(readonly page: Page) {
    this.deletePatientButton = page.locator(
      'button:has-text("Supprimer le patient")'
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
}

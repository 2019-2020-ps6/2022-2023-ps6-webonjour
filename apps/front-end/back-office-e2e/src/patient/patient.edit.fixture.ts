import { Locator, Page } from '@playwright/test';
import { PatientFixture } from './patient.fixture';

export class PatientEditFixture {
  readonly deletePatientButton: Locator;
  readonly accommodationsText: Locator;
  readonly accommodations: Locator;

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
    await this.deletePatientButton.click();
    // wait for the page to reload
    const patientFixture = new PatientFixture(this.page);
    await this.page.waitForLoadState('networkidle');
    await patientFixture.patients.first().waitFor({
      state: 'attached',
    });
  }

  async flipAccommodation(accommodation: number) {
    this.accommodations.nth(accommodation).click();
    // it doesn't reload automatically
    this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }
}

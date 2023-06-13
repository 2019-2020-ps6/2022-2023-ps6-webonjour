import { Locator, Page } from '@playwright/test';
import { MenuFixture } from '../menu/menu.fixture';

export class PatientFixture {
  readonly patients: Locator;
  readonly addPatientButton: Locator;

  constructor(readonly page: Page) {
    this.patients = page.locator('webonjour-patient-list tbody tr');
    this.addPatientButton = page.locator(
      'button:has-text("Ajouter un patient")'
    );
  }

  async goto() {
    const menuFixture = new MenuFixture(this.page);
    await menuFixture.goto();
    await menuFixture.patientButton.click();
    await this.patients.first().waitFor({
      state: 'visible',
    });
  }
}

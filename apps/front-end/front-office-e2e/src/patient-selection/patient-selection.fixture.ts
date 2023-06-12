import { Locator, Page } from '@playwright/test';

export class PatientSelectionFixture {
  readonly patients: Locator;

  constructor(readonly page: Page) {
    this.patients = page.locator('webonjour-card');
  }

  async goto() {
    await this.page.goto('/');
  }

  async selectPatient(patientNumber: number) {
    await this.patients.nth(patientNumber).click();
  }
}

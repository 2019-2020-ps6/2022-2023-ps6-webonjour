import { Locator, Page } from '@playwright/test';
import { FloorSelectionFixture } from '../floor-selection/floor-selection.fixture';

export class PatientSelectionFixture {
  readonly patients: Locator;

  constructor(readonly page: Page) {
    this.patients = page.locator('webonjour-card');
  }

  async goto(floor: number) {
    // select the first floor
    const floor_fixture = new FloorSelectionFixture(this.page);
    await floor_fixture.goto();
    await floor_fixture.selectFloor(floor);
  }

  async selectPatient(patientNumber: number) {
    await this.patients.nth(patientNumber).click();
  }
}

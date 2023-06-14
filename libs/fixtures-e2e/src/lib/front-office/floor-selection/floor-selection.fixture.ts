import { Locator, Page } from '@playwright/test';

export class FloorSelectionFixture {
  readonly floors: Locator;

  constructor(readonly page: Page) {
    this.floors = page.locator('.col');
  }

  async goto() {
    await this.page.goto('/');
  }

  async selectFloor(floorNumber: number) {
    await this.floors.nth(floorNumber).click();
    await this.page.waitForLoadState('networkidle');
  }
}

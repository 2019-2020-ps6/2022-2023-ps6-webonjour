import { expect, test as base } from '@playwright/test';
import { FloorSelectionFixture } from './floor-selection.fixture';

const test = base.extend<{ floorSelectionPage: FloorSelectionFixture }>({
  floorSelectionPage: async ({ page }, use) => {
    const floorSelectionFixture = new FloorSelectionFixture(page);
    await floorSelectionFixture.goto();
    await use(floorSelectionFixture);
  },
});
test.describe('Floor Selection', () => {
  test('should display the floor selection page', async ({
    floorSelectionPage,
  }) => {
    await expect(floorSelectionPage.floors).toHaveCount(3);
  });

  test('should click on the first floor', async ({ floorSelectionPage }) => {
    await floorSelectionPage.selectFloor(2);
  });
});

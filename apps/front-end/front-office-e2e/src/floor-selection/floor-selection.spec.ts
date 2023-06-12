import { test } from '../fixture';
import { expect } from '@playwright/test';

test.describe('Floor Selection', () => {
  test('should display the floor selection page', async ({
    fixtures: { floorSelectionPage },
  }) => {
    await floorSelectionPage.goto();
    await expect(floorSelectionPage.floors).toHaveCount(3);
  });

  test('should display correct number of patients for the corresponding floor', async ({
    fixtures: { floorSelectionPage, patientSelectionPage },
  }) => {
    await floorSelectionPage.goto();
    await floorSelectionPage.selectFloor(0);
    await expect(patientSelectionPage.patients).toHaveCount(2);

    await floorSelectionPage.goto();
    await floorSelectionPage.selectFloor(1);
    await expect(patientSelectionPage.patients).toHaveCount(1);

    await floorSelectionPage.goto();
    await floorSelectionPage.selectFloor(2);
    await expect(patientSelectionPage.patients).toHaveCount(1);
  });
});

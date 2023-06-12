import { expect } from '@playwright/test';
import { test } from '../fixture';

test.describe('Floor Selection', () => {
  test('should redirect to /list-quiz when patient selected', async ({
    fixtures: { floorSelectionPage, patientSelectionPage },
  }) => {
    await floorSelectionPage.goto();
    await floorSelectionPage.selectFloor(0);
    await patientSelectionPage.selectPatient(0);
    await expect(floorSelectionPage.page.url()).toBe(
      'http://localhost:4200/#/list-quiz'
    );
  });
});

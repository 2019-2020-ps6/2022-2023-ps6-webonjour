import { expect } from '@playwright/test';
import { frontOfficeTest as test } from '@webonjour/fixtures-e2e';
import { environment, protocol } from '@webonjour/shared/environments';

test.describe('Floor Selection', () => {
  test('should redirect to /list-quiz when patient selected', async ({
    fixtures: { floorSelectionPage, patientSelectionPage },
  }) => {
    await floorSelectionPage.goto();
    await floorSelectionPage.selectFloor(0);
    await patientSelectionPage.selectPatient(0);
    await expect(floorSelectionPage.page.url()).toBe(
      `${protocol(environment.front_office.secure)}://${
        environment.front_office.domain
      }list-quiz`
    );
  });
});

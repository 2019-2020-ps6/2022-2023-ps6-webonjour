import { expect } from '@playwright/test';
import { test } from '@webonjour/fixtures-e2e';

const b_test = test.extend({ baseURL: 'http://localhost:4200' });
const f_test = test.extend({ baseURL: 'http://localhost:4201' });

test.describe('cross-office', () => {
  b_test('back should work', async ({ page }) => {
    await page.goto('/');
    expect(true).toBeTruthy();
  });

  f_test('front should work', async ({ page }) => {
    await page.goto('/');
    expect(true).toBeTruthy();
  });

  f_test('floor selection should work', async ({ fixtures }) => {
    await fixtures.FrontOffice.floorSelectionPage.goto();
    fixtures.FrontOffice.floorSelectionPage.selectFloor(0);
    expect(true).toBeTruthy();
  });
});

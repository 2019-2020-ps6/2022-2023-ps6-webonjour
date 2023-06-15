import { backOfficeTest as test } from '@webonjour/fixtures-e2e';
import { expect } from '@playwright/test';

test('should start page', async ({ page }) => {
  await page.goto('./login');

  expect(true).toBeTruthy();
});

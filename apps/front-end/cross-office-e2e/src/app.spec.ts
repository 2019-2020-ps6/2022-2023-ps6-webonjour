import { expect } from '@playwright/test';
import { test } from '@webonjour/fixtures-e2e';
import { environment, protocol } from '@webonjour/shared/environments';

const b_test = test.extend({
  baseURL: `${protocol(environment.back_office.secure)}://${
    environment.back_office.domain
  }`,
});
const f_test = test.extend({
  baseURL: `${protocol(environment.front_office.secure)}://${
    environment.front_office.domain
  }`,
});

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

import { expect } from '@playwright/test';
import { test } from '@webonjour/fixtures-e2e';

test.describe('cross-office', () => {
  test.afterEach(async ({ backOfficePage, frontOfficePage }) => {
    await backOfficePage.close();
    await frontOfficePage.close();
  });

  test('back should work', async ({ BackOffice }) => {
    await BackOffice.loginPage.goto();
    expect(true).toBeTruthy();
  });

  test('front should work', async ({ FrontOffice }) => {
    await FrontOffice.floorSelectionPage.goto();
    expect(true).toBeTruthy();
  });

  test('floor selection should work', async ({ FrontOffice }) => {
    await FrontOffice.floorSelectionPage.goto();
    await FrontOffice.floorSelectionPage.selectFloor(0);
    expect(true).toBeTruthy();
  });

  test('using both', async ({ BackOffice, FrontOffice }) => {
    await BackOffice.loginPage.goto();
    await FrontOffice.floorSelectionPage.goto();
    expect(true).toBeTruthy();
  });
});

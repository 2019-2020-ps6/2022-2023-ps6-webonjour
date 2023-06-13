import { backOfficeTest as test } from '@webonjour/fixtures-e2e';

import { expect } from '@playwright/test';

test.describe('Login', () => {
  test('should login', async ({ fixtures }) => {
    await fixtures.loginPage.goto();
    await fixtures.loginPage.login('email@email.com', 'password');
    await expect(fixtures.loginPage.page).toHaveURL(/dashboard/);
  });

  test('should inform user about invalid email', async ({ fixtures }) => {
    await fixtures.loginPage.goto();
    await fixtures.loginPage.login('invalid-email', 'password');
    await expect(fixtures.loginPage.invalidEmailMessage).toBeVisible();
  });

  test('should inform user about invalid credentials', async ({ fixtures }) => {
    await fixtures.loginPage.goto();
    await fixtures.loginPage.login('email@email.org', 'password');
    await expect(fixtures.loginPage.page).toHaveURL(/login/);
  });
});

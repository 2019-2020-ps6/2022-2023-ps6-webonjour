import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Login', () => {
  test('should login', async ({ fixtures }) => {
    await fixtures.loginPage.goto();
    await fixtures.loginPage.login('email@email.com', 'password');
    await expect(fixtures.loginPage.page).toHaveURL(/dashboard/);
  });
});

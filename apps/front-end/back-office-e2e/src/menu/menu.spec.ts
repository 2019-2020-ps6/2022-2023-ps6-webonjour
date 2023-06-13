import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Menu', () => {
  test('should show menu', async ({ fixtures }) => {
    await fixtures.menuComponent.goto();
  });
  test('should show patient list', async ({ fixtures }) => {
    await fixtures.menuComponent.goto();
    await fixtures.menuComponent.patientButton.click();
    await expect(fixtures.menuComponent.page).toHaveURL(
      new RegExp('.*/dashboard/patients.*')
    );
  });

  test('should show quiz list', async ({ fixtures }) => {
    await fixtures.menuComponent.goto();
    await fixtures.menuComponent.patientButton.click();
    await fixtures.menuComponent.quizButton.click();
    await expect(fixtures.menuComponent.page).toHaveURL(
      new RegExp('.*/dashboard/quiz.*')
    );
  });
});

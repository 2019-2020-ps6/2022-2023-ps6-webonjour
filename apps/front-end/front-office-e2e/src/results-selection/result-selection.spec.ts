import { expect } from '@playwright/test';
import { frontOfficeTest as test } from '@webonjour/fixtures-e2e';

test.describe('Result Page', () => {
  test('should display the correct result', async ({
    fixtures: { resultSelectionPage },
  }) => {
    await resultSelectionPage.goto(0, 0, 0);
    await expect(resultSelectionPage.score).toContainText('3/4');
  });

  test('should allow to restart the quiz', async ({
    fixtures: { resultSelectionPage, quizSelectionPage },
  }) => {
    await resultSelectionPage.goto(0, 0, 0);
    await expect(resultSelectionPage.restart_button).toBeVisible();
    await resultSelectionPage.restart();
    await expect(quizSelectionPage.quizContainer).toBeVisible();
  });
});

import { expect } from '@playwright/test';
import { frontOfficeTest as test } from '@webonjour/fixtures-e2e';

test.describe('Quiz Selection', () => {
  test('should redirect to quiz-answer', async ({
    fixtures: { quizSelectionPage },
  }) => {
    await quizSelectionPage.goto(0, 0);
    await quizSelectionPage.selectQuiz(0);
    await quizSelectionPage.page.waitForSelector('webonjour-game-question');
    await expect(quizSelectionPage.page).toHaveURL(/quiz-answer/);
  });
});

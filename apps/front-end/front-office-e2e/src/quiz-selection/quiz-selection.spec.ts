import { expect } from '@playwright/test';
import { frontOfficeTest as test } from '@webonjour/fixtures-e2e';
import { environment, protocol } from '@webonjour/shared/environments';

test.describe('Quiz Selection', () => {
  test('should redirect to /#/quiz-answer', async ({
    fixtures: { quizSelectionPage },
  }) => {
    await quizSelectionPage.goto(0, 0);
    await quizSelectionPage.selectQuiz(0);
    await quizSelectionPage.page.waitForSelector('webonjour-game-question');
    await expect(quizSelectionPage.page.url()).toBe(
      `${protocol(environment.front_office.secure)}://${
        environment.front_office.domain
      }/#/quiz-answer`
    );
  });
});

import { expect } from '@playwright/test';
import { test } from '../fixture';
import { environment, protocol } from '@webonjour/shared/environments';

test.describe('Floor Selection', () => {
  test('should redirect to /list-quiz when patient selected', async ({
    fixtures: { floorSelectionPage, patientSelectionPage },
  }) => {
    await patientSelectionPage.goto();
    await patientSelectionPage.selectPatient(0);
    await expect(floorSelectionPage.page.url()).toBe(
      `${protocol(environment.front_office.secure)}://${
        environment.front_office.domain
      }/#/list-quiz`
    );
  });

  test('should redirect to /#/quiz-answer', async ({
    fixtures: { quizSelectionPage },
  }) => {
    await quizSelectionPage.goto();
    await quizSelectionPage.selectQuiz(0);
    await quizSelectionPage.page.waitForLoadState('networkidle');
    await expect(quizSelectionPage.page.url()).toBe(
      `${protocol(environment.front_office.secure)}://${
        environment.front_office.domain
      }/#/quiz-answer`
    );
  });
});

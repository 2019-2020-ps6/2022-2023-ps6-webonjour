import { expect } from '@playwright/test';
import { frontOfficeTest as test } from '@webonjour/fixtures-e2e';
import { environment, protocol } from '@webonjour/shared/environments';

test.describe('Learning Card Selection', () => {
  test('should have url /#/learning-card', async ({
    fixtures: { learningCardSelectionPage },
  }) => {
    await learningCardSelectionPage.goto();
    await expect(learningCardSelectionPage.page.url()).toBe(
      `${protocol(environment.front_office.secure)}://${
        environment.front_office.domain
      }/#/learning-card`
    );
  });

  test('should have the right title', async ({
    fixtures: { learningCardSelectionPage },
  }) => {
    await learningCardSelectionPage.goto();
    await expect(learningCardSelectionPage.title).toHaveText(
      "Quelle était la couleur du cheval blanc d'Henri IV ?"
    );
  });

  test('should have the right answer', async ({
    fixtures: { learningCardSelectionPage },
  }) => {
    await learningCardSelectionPage.goto();
    await expect(
      learningCardSelectionPage.page.getByText('Blanc').last()
    ).toBeVisible();
  });

  test('should display image', async ({
    fixtures: { learningCardSelectionPage },
  }) => {
    await learningCardSelectionPage.goto();
    await expect(
      learningCardSelectionPage.page.locator('img').first()
    ).toBeVisible();
  });
});

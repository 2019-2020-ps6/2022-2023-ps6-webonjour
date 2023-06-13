import { expect } from '@playwright/test';
import { test } from '../fixture';
import { environment, protocol } from '@webonjour/shared/environments';
test.describe('Help page', () => {
  test('should display clue', async ({ fixtures: { helpPage } }) => {
    await helpPage.goto(0, 0, 0);
    await expect(helpPage.clue).toHaveText(/Indice: .*/);
  });

  test('should display title', async ({ fixtures: { helpPage } }) => {
    await helpPage.goto(0, 0, 0);
    await expect(helpPage.title).toHaveText(
      'Vous êtes en train de répondre au quiz'
    );
  });

  test('should display back button', async ({ fixtures: { helpPage } }) => {
    await helpPage.goto(0, 0, 0);
    await expect(helpPage.backButton).toHaveText('Retourner à la question');
  });
});

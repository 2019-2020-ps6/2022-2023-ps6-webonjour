import { expect } from '@playwright/test';
import { test } from '../fixture';
import { environment, protocol } from '@webonjour/shared/environments';
test.describe('Help page', () => {
  test('should display clue', async ({ fixtures: { helpPage } }) => {
    await helpPage.goto(0, 0, 0);
    await expect(helpPage.clue).toHaveText(
      "Indice: Cette couleur ne fait pas partie de l'arc-en-ciel mais en est la combinaison."
    );
  });
});

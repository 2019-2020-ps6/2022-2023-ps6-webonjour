import { test } from '../fixture';
import { expect } from '@playwright/test';

test.describe('Result Page', () => {
  test('should display the correct result', async ({
    fixtures: { resultSelectionPage },
  }) => {
    await resultSelectionPage.goto(0, 0, 0);
    await expect(resultSelectionPage.score).toHaveText(' 3/4');
  });
});

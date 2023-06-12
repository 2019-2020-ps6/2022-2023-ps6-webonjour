import { test } from '../fixture';
import { expect } from '@playwright/test';
import { environment, protocol } from '@webonjour/shared/environments';

test('should redirect to back office', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.header-button')).toHaveAttribute(
    'href',
    `${protocol(environment.back_office.secure)}://${
      environment.back_office.domain
    }`
  );
});

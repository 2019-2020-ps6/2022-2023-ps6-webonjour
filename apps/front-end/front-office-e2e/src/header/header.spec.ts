import { frontOfficeTest as test } from '@webonjour/fixtures-e2e';
import { expect } from '@playwright/test';
import { getEnv, protocol } from '@webonjour/shared/environments';

let environment = getEnv('development');
if (process.env.NODE_ENV === 'production') {
  environment = getEnv('production');
}
test('should redirect to back office', async ({ page }) => {
  await page.goto('.');
  await expect(page.locator('.header-button')).toHaveAttribute(
    'href',
    `${protocol(environment.back_office.secure)}://${
      environment.back_office.domain
    }`
  );
});

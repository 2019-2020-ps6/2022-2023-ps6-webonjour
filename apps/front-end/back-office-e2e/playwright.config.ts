import type { PlaywrightTestConfig } from '@playwright/test';

import { baseConfig } from '../../../playwright.config.base';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  globalSetup: require.resolve(
    'apps/front-end/back-office-e2e/src/support/global-setup.ts'
  ),
  globalTeardown: require.resolve(
    'apps/front-end/back-office-e2e/src/support/global-teardown.ts'
  ),
  use: {
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
};

export default config;

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
};

export default config;

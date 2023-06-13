import type { PlaywrightTestConfig } from '@playwright/test';

import { baseConfig } from '../../../playwright.config.base';
import { environment, protocol } from '@webonjour/shared/environments';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  globalSetup: require.resolve(
    'apps/front-end/front-office-e2e/src/support/global-setup.ts'
  ),
  globalTeardown: require.resolve(
    'apps/front-end/front-office-e2e/src/support/global-teardown.ts'
  ),
  use: {
    ...baseConfig.use,
    baseURL: `${protocol(environment.front_office.secure)}://${
      environment.front_office.domain
    }`,
  },
};

export default config;

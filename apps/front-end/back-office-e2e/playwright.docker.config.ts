import type { PlaywrightTestConfig } from '@playwright/test';

import { baseConfig } from '../../../playwright.config.base';
import { environment, protocol } from '@webonjour/shared/environments';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: `${protocol(environment.back_office.secure)}://${
      environment.back_office.domain
    }`,
  },
};

export default config;

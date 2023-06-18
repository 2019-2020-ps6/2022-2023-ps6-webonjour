import type { PlaywrightTestConfig } from '@playwright/test';

import { baseConfig } from '../../../playwright.config.base';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  use: {
    ...baseConfig.use,
  },
};

export default config;

import { test as base } from '@playwright/test';
import { LoginFixture } from './login/login.fixture';

interface Fixtures {
  loginPage: LoginFixture;
}

export const test = base.extend<{ fixtures: Fixtures }>({
  fixtures: async ({ page }, use) => {
    await use({
      loginPage: new LoginFixture(page),
    });
  },
});

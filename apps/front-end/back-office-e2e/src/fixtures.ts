import { test as base } from '@playwright/test';
import { LoginFixture } from './login/login.fixture';
import { MenuFixture } from './menu/menu.fixture';

interface Fixtures {
  loginPage: LoginFixture;
  menuComponent: MenuFixture;
}

export const test = base.extend<{ fixtures: Fixtures }>({
  fixtures: async ({ page }, use) => {
    await use({
      loginPage: new LoginFixture(page),
      menuComponent: new MenuFixture(page),
    });
  },
});

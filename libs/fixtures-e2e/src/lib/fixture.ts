import { Page, test as base } from '@playwright/test';
import {
  backOfficeBuildFixtures,
  BackOfficeFixtures,
} from './back-office/fixtures';
import {
  frontOfficeBuildFixtures,
  FrontOfficeFixtures,
} from './front-office/fixture';
import { environment, protocol } from '@webonjour/shared/environments';

interface MergeFixtures {
  BackOffice: BackOfficeFixtures;
  FrontOffice: FrontOfficeFixtures;
  backOfficePage: Page;
  frontOfficePage: Page;
}

const test = base.extend<MergeFixtures>({
  BackOffice: async ({ backOfficePage }, use) => {
    await use(backOfficeBuildFixtures(backOfficePage));
  },
  FrontOffice: async ({ frontOfficePage }, use) => {
    await use(frontOfficeBuildFixtures(frontOfficePage));
  },
  backOfficePage: async ({ browser }, use) => {
    const page = await browser.newPage({
      baseURL: `${protocol(environment.back_office.secure)}://${
        environment.back_office.domain
      }`,
    });
    await use(page);
  },
  frontOfficePage: async ({ browser }, use) => {
    const page = await browser.newPage({
      baseURL: `${protocol(environment.front_office.secure)}://${
        environment.front_office.domain
      }`,
    });
    await use(page);
  },
});

export { test, backOfficeBuildFixtures, frontOfficeBuildFixtures };

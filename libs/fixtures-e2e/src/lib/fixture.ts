import { test as base } from '@playwright/test';
import {
  backOfficeBuildFixtures,
  BackOfficeFixtures,
} from './back-office/fixtures';
import {
  frontOfficeBuildFixtures,
  FrontOfficeFixtures,
} from './front-office/fixture';

interface MergeFixtures {
  BackOffice: BackOfficeFixtures;
  FrontOffice: FrontOfficeFixtures;
}

const test = base.extend<{ fixtures: MergeFixtures }>({
  fixtures: async ({ page }, use) => {
    await use({
      BackOffice: backOfficeBuildFixtures(page),
      FrontOffice: frontOfficeBuildFixtures(page),
    });
  },
});

export { test };

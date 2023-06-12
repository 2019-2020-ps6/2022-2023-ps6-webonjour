import { test as base } from '@playwright/test';
import { FloorSelectionFixture } from './floor-selection/floor-selection.fixture';
import { PatientSelectionFixture } from './patient-selection/patient-selection.fixture';

interface Fixtures {
  floorSelectionPage: FloorSelectionFixture;
  patientSelectionPage: PatientSelectionFixture;
}

const test = base.extend<{ fixtures: Fixtures }>({
  fixtures: async ({ page }, use) => {
    const floorSelectionFixture = new FloorSelectionFixture(page);
    const patientSelectionFixture = new PatientSelectionFixture(page);
    await use({
      floorSelectionPage: floorSelectionFixture,
      patientSelectionPage: patientSelectionFixture,
    });
  },
});

export { test };

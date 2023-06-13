import { backOfficeTest as test } from '@webonjour/fixtures-e2e';
import { expect } from '@playwright/test';

const DEFAULT_PATIENT_COUNT = 4;
test.describe('Patient', () => {
  test('should show patient list', async ({ fixtures }) => {
    await fixtures.patientPage.goto();
    await expect(fixtures.patientPage.page).toHaveURL(
      new RegExp('.*/dashboard/patient.*')
    );
    expect(
      await fixtures.patientPage.addPatientButton.isVisible()
    ).toBeTruthy();
    expect(await fixtures.patientPage.patients.count()).toBe(
      DEFAULT_PATIENT_COUNT
    );
  });

  test('should add patient', async ({ fixtures }) => {
    await fixtures.patientAddPage.goto();
    await fixtures.patientAddPage.addPatient({
      firstname: 'John',
      surname: 'Doe',
      age: '42',
      diseaseStage: 'STAGE_1',
      image: 'apps/front-end/back-office-e2e/src/assets/images/quiz_image.png',
      description: 'Lorem ipsum',
      floor: '1',
    });
    expect(await fixtures.patientPage.patients.count()).toBe(
      DEFAULT_PATIENT_COUNT + 1
    );
  });

  test('should delete patient', async ({ fixtures }) => {
    await fixtures.patientPage.goto();
    await fixtures.patientPage.patients.last().click();
    await fixtures.patientEditPage.deletePatient();
    expect(await fixtures.patientPage.patients.count()).toBe(
      DEFAULT_PATIENT_COUNT
    );
  });
});

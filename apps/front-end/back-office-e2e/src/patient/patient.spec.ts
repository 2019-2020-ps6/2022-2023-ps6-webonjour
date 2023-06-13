import { test } from '../fixtures';
import { expect } from '@playwright/test';

const DEFAULT_PATIENT_COUNT = 4;
const DEFAULT_QUIZ_COUNT = 4;

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

  test('should remove and add quiz', async ({ fixtures }) => {
    await fixtures.patientPage.goto();
    await fixtures.patientPage.patients.last().click();

    console.log(await fixtures.patientEditPage.quiz.allInnerTexts());
    expect(await fixtures.patientEditPage.quiz.count()).toBe(
      DEFAULT_QUIZ_COUNT
    );

    await fixtures.patientEditPage.deleteQuiz(0);
    expect(await fixtures.patientEditPage.quiz.count()).toBe(
      DEFAULT_QUIZ_COUNT - 1
    );
    await fixtures.patientEditPage.assignQuiz(0);
    expect(await fixtures.patientEditPage.quiz.count()).toBe(
      DEFAULT_QUIZ_COUNT
    );
  });
});

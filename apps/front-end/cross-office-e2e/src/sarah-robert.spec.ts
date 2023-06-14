import { expect } from '@playwright/test';
import { test } from '@webonjour/fixtures-e2e';

const IMAGE = 'apps/front-end/cross-office-e2e/src/images/image.png';

test.describe('sarah scenario', () => {
  test.afterEach(async ({ backOfficePage, frontOfficePage }) => {
    await backOfficePage.close();
    await frontOfficePage.close();
  });

  test('sarah should be able to create a gardening quiz', async ({
    BackOffice,
  }) => {
    await BackOffice.quizAddPage.goto();
    await BackOffice.quizAddPage.addQuiz('Gardening', IMAGE);
  });

  test('sarah should be able to add a MCQ question', async ({ BackOffice }) => {
    await BackOffice.quizEditPage.goto(
      (await BackOffice.quizPage.quizzes.count()) - 1
    );
    await BackOffice.questionAddPage.addQuestion(
      'What is the best season to plant tomatoes?',
      'CHOICE',
      IMAGE
    );
    await BackOffice.quizEditPage.questions.last().click();
    await BackOffice.answerPage.addAnswer('Spring', true, IMAGE);
    await BackOffice.answerPage.addAnswer('Summer', false, IMAGE);
    await BackOffice.answerPage.addAnswer('Autumn', false);
    await BackOffice.answerPage.addAnswer('Winter', false);
  });

  test('sarah should be able to add a drag and drop question', async ({
    BackOffice,
  }) => {
    await BackOffice.quizEditPage.goto(
      (await BackOffice.quizPage.quizzes.count()) - 1
    );
    await BackOffice.questionAddPage.addQuestion(
      'In what order do the seasons occur?',
      'REORDER',
      IMAGE
    );
    await BackOffice.quizEditPage.questions.last().click();
    await BackOffice.answerPage.addAnswer('Spring', false);
    await BackOffice.answerPage.addAnswer('Summer', false);
    await BackOffice.answerPage.addAnswer('Autumn', false);
    await BackOffice.answerPage.addAnswer('Winter', false);
  });

  test('sarah should be able to add Robert', async ({ BackOffice }) => {
    await BackOffice.patientAddPage.goto();
    await BackOffice.patientAddPage.addPatient({
      firstname: 'Robert',
      surname: 'Trebor',
      age: '50',
      image: IMAGE,
      diseaseStage: 'STAGE_3',
      description: 'Robert desu',
      floor: '1',
    });
  });

  test('sarah should be able to assign the gardening quiz to Robert', async ({
    BackOffice,
  }) => {
    await BackOffice.patientEditPage.goto(
      (await BackOffice.patientPage.patients.count()) - 1
    );
    await BackOffice.patientEditPage.assignQuiz(
      (await BackOffice.quizPage.quizzes.count()) - 1
    );
  });

  test('sarah should be able to add the TTS accommodation', async ({
    BackOffice,
  }) => {
    await BackOffice.patientEditPage.goto(
      (await BackOffice.patientPage.patients.count()) - 1
    );
    await BackOffice.patientEditPage.flipAccommodation(6, true);
  });
});

test.describe('robert scenario', () => {
  test.afterEach(async ({ backOfficePage, frontOfficePage }) => {
    await backOfficePage.close();
    await frontOfficePage.close();
  });
});

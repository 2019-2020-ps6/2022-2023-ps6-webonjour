import { expect } from '@playwright/test';
import { test } from '@webonjour/fixtures-e2e';

const IMAGE = 'apps/front-end/cross-office-e2e/src/images/image.png';

const FIRST_QUESTION = 'What is the best season to plant tomatoes?';
const SECOND_QUESTION = 'In what order do the seasons occur?';

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
      FIRST_QUESTION,
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
      SECOND_QUESTION,
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
      floor: '0',
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

  test('robert should be able to see the gardening quiz', async ({
    FrontOffice,
  }) => {
    await FrontOffice.quizSelectionPage.goto(0, 0);
    expect(await FrontOffice.quizSelectionPage.quizContainer.count()).toEqual(
      1
    );
    expect(
      await FrontOffice.quizSelectionPage.quizContainer.first().innerText()
    ).toEqual('Gardening');
  });

  test('robert should be able to answer the questions and see his score', async ({
    FrontOffice,
  }) => {
    await FrontOffice.questionSelectionPage.goto(0, 0, 0);
    expect(await FrontOffice.questionSelectionPage.title.innerText()).toEqual(
      FIRST_QUESTION
    );

    await FrontOffice.questionSelectionPage.selectAnswer(0);

    expect(await FrontOffice.questionSelectionPage.title.innerText()).toEqual(
      SECOND_QUESTION
    );

    /* FIXME: This test is broken
        await FrontOffice.questionSelectionPage.validateDragAndDrop();

        expect(await FrontOffice.resultSelectionPage.score.innerText()).toEqual('1/2');
        */
    await FrontOffice.questionSelectionPage.skipQuestion();

    expect(FrontOffice.resultSelectionPage.score).toHaveText('Bien Joué !');
    expect(FrontOffice.resultSelectionPage.restart_button).toBeHidden();
  });
});

test.describe('sarah scenario after robert', () => {
  test.afterEach(async ({ backOfficePage, frontOfficePage }) => {
    await backOfficePage.close();
    await frontOfficePage.close();
  });

  test('sarah should be able to see Robert stats', async ({ BackOffice }) => {
    await BackOffice.patientPage.goto();
    await BackOffice.patientPage.patients.last().click();
    const stats = await BackOffice.patientEditPage.stats();
    expect(stats).toEqual({
      'Meilleur Quiz': 'Gardening',
      'Pourcentage de réussite': '100%',
      'Quiz joués': '1',
      'Quiz le plus joué': 'Gardening',
    });
  });

  test('sarah should be able to delete Robert', async ({ BackOffice }) => {
    const patientPage = BackOffice.patientPage;
    await patientPage.goto();
    expect((await patientPage.patients.allInnerTexts()).join('')).toContain(
      'Robert Trebor'
    );
    await BackOffice.patientEditPage.goto(
      (await patientPage.patients.count()) - 1
    );
    await BackOffice.patientEditPage.deletePatient();
    await patientPage.goto();
    expect((await patientPage.patients.allInnerTexts()).join('')).not.toContain(
      'Robert Trebor'
    );
  });

  test('sarah should be able to delete the gardening quiz', async ({
    BackOffice,
  }) => {
    const quizPage = BackOffice.quizPage;
    await quizPage.goto();
    expect((await quizPage.quizzes.allInnerTexts()).join('')).toContain(
      'Gardening'
    );
    await BackOffice.quizEditPage.goto((await quizPage.quizzes.count()) - 1);
    await BackOffice.quizEditPage.deleteQuiz();
    await quizPage.goto();
    expect((await quizPage.quizzes.allInnerTexts()).join('')).not.toContain(
      'Gardening'
    );
  });
});

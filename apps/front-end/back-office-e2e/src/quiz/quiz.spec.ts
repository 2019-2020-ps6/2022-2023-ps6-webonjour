import { test } from '../fixtures';
import { expect } from '@playwright/test';

const DEFAULT_QUIZ_COUNT = 4;
const QUIZ_NAME = 'Quiz 1';
const QUIZ_UPDATED_NAME = 'Quiz 2';
const QUIZ_IMAGE_PATH =
  'apps/front-end/back-office-e2e/src/assets/images/quiz_image.png';

test.describe('Quiz', () => {
  test('should show quiz list', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await expect(fixtures.quizPage.page).toHaveURL(
      new RegExp('.*/dashboard/quiz.*')
    );
    expect(await fixtures.quizPage.quizzes.count()).toBe(DEFAULT_QUIZ_COUNT);
  });

  test('should add quiz', async ({ fixtures }) => {
    await fixtures.quizAddPage.goto();
    await fixtures.quizAddPage.addQuiz(QUIZ_NAME, QUIZ_IMAGE_PATH);
    expect(await fixtures.quizPage.quizzes.count()).toBe(
      DEFAULT_QUIZ_COUNT + 1
    );
  });

  test('should edit quiz', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.updateQuiz(QUIZ_UPDATED_NAME);

    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().waitFor({
      state: 'visible',
    });
    expect(await fixtures.quizPage.quizzes.count()).toBe(
      DEFAULT_QUIZ_COUNT + 1
    );
    await fixtures.quizPage.quizzes.last().click();
    await expect(
      await fixtures.quizEditPage.quizGeneralTitle.inputValue()
    ).toBe(QUIZ_UPDATED_NAME);
  });

  test('should delete quiz', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.deleteQuiz();
    expect(await fixtures.quizPage.quizzes.count()).toBe(DEFAULT_QUIZ_COUNT);
  });
});

import { test } from '../fixtures';
import { expect } from '@playwright/test';

const DEFAULT_QUIZ_COUNT = 4;
test.describe('Quiz', () => {
  test('should show quiz list', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await expect(fixtures.quizPage.page).toHaveURL(
      new RegExp('.*/dashboard/quiz.*')
    );
    expect(await fixtures.quizPage.addQuizButton.isVisible()).toBeTruthy();
    expect(await fixtures.quizPage.quizzes.count()).toBe(DEFAULT_QUIZ_COUNT);
  });

  test('should add quiz', async ({ fixtures }) => {
    await fixtures.quizAddPage.goto();
    await fixtures.quizAddPage.addQuiz(
      'Quiz 1',
      'apps/front-end/back-office-e2e/src/assets/images/quiz_image.png'
    );
    expect(await fixtures.quizPage.quizzes.count()).toBe(
      DEFAULT_QUIZ_COUNT + 1
    );
  });

  test('should delete quiz', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.deleteQuiz();
    expect(await fixtures.quizPage.quizzes.count()).toBe(DEFAULT_QUIZ_COUNT);
  });
});

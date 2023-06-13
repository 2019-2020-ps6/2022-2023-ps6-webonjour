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
    await fixtures.quizAddPage.page.waitForLoadState('networkidle');
    await fixtures.quizAddPage.addQuiz(QUIZ_NAME, QUIZ_IMAGE_PATH);
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().waitFor({
      state: 'visible',
    });
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

  test('should add question to quiz', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.questionAddPage.addQuestion('Question 1', 'CHOICE');
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    expect(await fixtures.quizEditPage.questions.count()).toBe(1);
  });

  test('should edit question', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await fixtures.questionEditPage.updateQuestion('Question 2');
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await expect(
      await fixtures.questionEditPage.questionGeneralTitle.inputValue()
    ).toBe('Question 2');
  });

  test('should add answer to question', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await fixtures.answerPage.addAnswer('Answer 1', true);
    // wait for answer to be visible
    await fixtures.answerPage.answers.last().waitFor({
      state: 'visible',
    });

    expect(await fixtures.answerPage.answers.count()).toBe(1);
  });

  test('should edit answer', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await fixtures.answerPage.updateAnswer(0, 'Answer 2', false);
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await expect(
      await fixtures.answerPage.answers
        .first()
        .locator('td')
        .first()
        .innerText()
    ).toBe('Answer 2');
  });

  test('should delete answer', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await fixtures.answerPage.deleteAnswer(0);
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    expect(await fixtures.answerPage.answers.count()).toBe(0);
  });

  test('should add clue to question', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await fixtures.cluePage.addClue('Clue 1');
    // wait for clue to be visible
    await fixtures.cluePage.clues.last().waitFor({
      state: 'visible',
    });
    expect(await fixtures.cluePage.clues.count()).toBe(1);
  });

  test('should edit clue', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await fixtures.cluePage.updateClue(0, 'Clue 2');
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await expect(
      await fixtures.cluePage.clues.first().locator('td').first().innerText()
    ).toBe('Clue 2');
  });

  test('should delete clue', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await fixtures.cluePage.deleteClue(0);
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    expect(await fixtures.cluePage.clues.count()).toBe(0);
  });

  test('should delete question', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.questions.last().click();
    await fixtures.questionEditPage.deleteQuestion();
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    expect(await fixtures.quizEditPage.questions.count()).toBe(0);
  });

  test('should delete quiz', async ({ fixtures }) => {
    await fixtures.quizPage.goto();
    await fixtures.quizPage.quizzes.last().click();
    await fixtures.quizEditPage.deleteQuiz();
    expect(await fixtures.quizPage.quizzes.count()).toBe(DEFAULT_QUIZ_COUNT);
  });
});

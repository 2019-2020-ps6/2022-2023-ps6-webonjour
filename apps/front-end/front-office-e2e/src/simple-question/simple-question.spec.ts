import { test } from '../fixture';
import { expect } from '@playwright/test';
import { environment, protocol } from '@webonjour/shared/environments';

test.describe('Quiz Selection', () => {
  test('should display all answers', async ({
    fixtures: { simpleQuestionSelectionPage },
  }) => {
    await simpleQuestionSelectionPage.goto();
    await expect(simpleQuestionSelectionPage.answers).toHaveCount(4);
  });

  test('should display correct title', async ({
    fixtures: { simpleQuestionSelectionPage },
  }) => {
    await simpleQuestionSelectionPage.goto();
    await expect(simpleQuestionSelectionPage.title).toHaveText(
      "Quelle était la couleur du cheval blanc d'Henri IV ?"
    );
  });

  test('should go to next question', async ({
    fixtures: { simpleQuestionSelectionPage },
  }) => {
    await simpleQuestionSelectionPage.goto();
    await simpleQuestionSelectionPage.selectAnswer(0);
    await expect(simpleQuestionSelectionPage.title).not.toHaveText(
      "Quelle est la couleur du cheval blanc d'Henri IV ?"
    );
    await expect(simpleQuestionSelectionPage.title).toHaveText(
      'Quel était le nom du cheval de Napoléon Bonaparte ?'
    );
  });

  test('should redirect to /#/result when done', async ({
    fixtures: { simpleQuestionSelectionPage },
  }) => {
    await simpleQuestionSelectionPage.goto();
    await simpleQuestionSelectionPage.selectAnswer(0);
    await simpleQuestionSelectionPage.selectAnswer(0);
    await simpleQuestionSelectionPage.selectAnswer(0);
    await simpleQuestionSelectionPage.selectAnswer(2);
    await expect(simpleQuestionSelectionPage.page).toHaveURL(
      `${protocol(environment.front_office.secure)}://${
        environment.front_office.domain
      }/#/result`
    );
  });
});

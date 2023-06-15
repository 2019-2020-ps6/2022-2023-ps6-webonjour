import { frontOfficeTest as test } from '@webonjour/fixtures-e2e';
import { expect } from '@playwright/test';
import { environment, protocol } from '@webonjour/shared/environments';

test.describe('Quiz Selection', () => {
  test('should display all answers', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 0);
    await expect(questionSelectionPage.answers).toHaveCount(4);
  });

  test('should display correct title', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 0);
    await expect(questionSelectionPage.title).toHaveText(
      "Quelle était la couleur du cheval blanc d'Henri IV ?"
    );
  });

  test('should go to next question', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 0);
    await questionSelectionPage.selectAnswer(0);
    await expect(questionSelectionPage.title).not.toHaveText(
      "Quelle est la couleur du cheval blanc d'Henri IV ?"
    );
    await expect(questionSelectionPage.title).toHaveText(
      'Quel était le nom du cheval de Napoléon Bonaparte ?'
    );
  });

  test('should redirect to /result when done', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 0);
    await questionSelectionPage.selectAnswer(0);
    await questionSelectionPage.selectAnswer(0);
    await questionSelectionPage.selectAnswer(0);
    await questionSelectionPage.selectAnswer(2);
    await expect(questionSelectionPage.page).toHaveURL(
      `${protocol(environment.front_office.secure)}://${
        environment.front_office.domain
      }result`
    );
  });

  test('should skip question', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 0);
    await questionSelectionPage.skipQuestion();
    await expect(questionSelectionPage.title).toHaveText(
      'Quel était le nom du cheval de Napoléon Bonaparte ?'
    );
  });

  test('should allow to select 2 answers when accomodation is enabled', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 1, 0);
    await questionSelectionPage.selectAnswer(1);
    await expect(questionSelectionPage.title).toHaveText(
      "Quelle était la couleur du cheval blanc d'Henri IV ?"
    );
  });

  test('shoud display images when accomodation is enabled', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 1, 0);
    questionSelectionPage.selectAnswer(1);
    // 'background-image: url(.*);'
    await expect(questionSelectionPage.answers.nth(0)).toHaveAttribute(
      'style',
      /background-image: url\(.*\);/
    );
  });
});

test.describe('Drag and Drop Question', () => {
  test('should display all answers', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 3);
    await expect(questionSelectionPage.answers).toHaveCount(4);
  });

  test('should display correct title', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 3);
    await expect(questionSelectionPage.title).toHaveText(
      "Réordonner par ordre logique pour s'habiller"
    );
  });

  test('should go to next question', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 3);

    const answer0 = await questionSelectionPage.answers.nth(0).textContent();
    const answer1 = await questionSelectionPage.answers.nth(1).textContent();

    await questionSelectionPage.moveDragAndDropAnswer(0, 1);

    await expect(questionSelectionPage.answers.nth(0)).toHaveText(answer1);
    await expect(questionSelectionPage.answers.nth(1)).toHaveText(answer0);
  });

  test('skip should skip question', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 3);
    await questionSelectionPage.skipQuestion();
    await expect(questionSelectionPage.title).toHaveText(
      'Réordonner par ordre logique pour faire des pâtes.'
    );
  });

  test('should drag and drop answers', async ({
    fixtures: { questionSelectionPage },
  }) => {
    await questionSelectionPage.goto(0, 0, 3);
    await questionSelectionPage.validateDragAndDrop();
  });
});

import { test as base } from '@playwright/test';
import { LoginFixture } from './login/login.fixture';
import { MenuFixture } from './menu/menu.fixture';
import { QuizFixture } from './quiz/quiz.fixture';
import { QuizAddFixture } from './quiz/quiz.add.fixture';
import { QuizEditFixture } from './quiz/quiz.edit.fixture';

interface Fixtures {
  loginPage: LoginFixture;
  menuComponent: MenuFixture;
  quizPage: QuizFixture;
  quizAddPage: QuizAddFixture;
  quizEditPage: QuizEditFixture;
}

export const test = base.extend<{ fixtures: Fixtures }>({
  fixtures: async ({ page }, use) => {
    await use({
      loginPage: new LoginFixture(page),
      menuComponent: new MenuFixture(page),
      quizPage: new QuizFixture(page),
      quizAddPage: new QuizAddFixture(page),
      quizEditPage: new QuizEditFixture(page),
    });
  },
});

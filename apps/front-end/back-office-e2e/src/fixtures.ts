import { test as base } from '@playwright/test';
import { LoginFixture } from './login/login.fixture';
import { MenuFixture } from './menu/menu.fixture';
import { QuizFixture } from './quiz/quiz.fixture';
import { QuizAddFixture } from './quiz/quiz.add.fixture';
import { QuizEditFixture } from './quiz/quiz.edit.fixture';
import { PatientAddFixture } from './patient/patient.add.fixture';
import { PatientFixture } from './patient/patient.fixture';
import { PatientEditFixture } from './patient/patient.edit.fixture';

interface Fixtures {
  loginPage: LoginFixture;
  menuComponent: MenuFixture;
  quizPage: QuizFixture;
  quizAddPage: QuizAddFixture;
  quizEditPage: QuizEditFixture;
  patientPage: PatientFixture;
  patientAddPage: PatientAddFixture;
  patientEditPage: PatientEditFixture;
}

export const test = base.extend<{ fixtures: Fixtures }>({
  fixtures: async ({ page }, use) => {
    await use({
      loginPage: new LoginFixture(page),
      menuComponent: new MenuFixture(page),
      quizPage: new QuizFixture(page),
      quizAddPage: new QuizAddFixture(page),
      quizEditPage: new QuizEditFixture(page),
      patientPage: new PatientFixture(page),
      patientAddPage: new PatientAddFixture(page),
      patientEditPage: new PatientEditFixture(page),
    });
  },
});

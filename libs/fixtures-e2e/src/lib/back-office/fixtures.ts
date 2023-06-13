import { test as base } from '@playwright/test';
import { LoginFixture } from './login/login.fixture';
import { MenuFixture } from './menu/menu.fixture';
import { QuizFixture } from './quiz/quiz.fixture';
import { QuizAddFixture } from './quiz/quiz.add.fixture';
import { QuizEditFixture } from './quiz/quiz.edit.fixture';
import { PatientAddFixture } from './patient/patient.add.fixture';
import { PatientFixture } from './patient/patient.fixture';
import { PatientEditFixture } from './patient/patient.edit.fixture';
import { QuestionAddFixture } from './quiz/question.add.fixture';
import { QuestionEditFixture } from './quiz/question.edit.fixture';
import { AnswerFixture } from './quiz/answer.fixture';
import { ClueFixture } from './quiz/clue.fixture';
import { environment, protocol } from '@webonjour/shared/environments';

interface Fixtures {
  loginPage: LoginFixture;
  menuComponent: MenuFixture;
  quizPage: QuizFixture;
  quizAddPage: QuizAddFixture;
  quizEditPage: QuizEditFixture;
  patientPage: PatientFixture;
  patientAddPage: PatientAddFixture;
  patientEditPage: PatientEditFixture;
  questionAddPage: QuestionAddFixture;
  questionEditPage: QuestionEditFixture;
  answerPage: AnswerFixture;
  cluePage: ClueFixture;
}

export const test = base.extend<{ fixtures: Fixtures }>({
  baseURL: `${protocol(environment.back_office.secure)}://${
    environment.back_office.domain
  }`,
  fixtures: async ({ page }, use) => {
    await use(buildFixtures(page));
  },
});

const buildFixtures = (page) => {
  return {
    loginPage: new LoginFixture(page),
    menuComponent: new MenuFixture(page),
    quizPage: new QuizFixture(page),
    quizAddPage: new QuizAddFixture(page),
    quizEditPage: new QuizEditFixture(page),
    patientPage: new PatientFixture(page),
    patientAddPage: new PatientAddFixture(page),
    patientEditPage: new PatientEditFixture(page),
    questionAddPage: new QuestionAddFixture(page),
    questionEditPage: new QuestionEditFixture(page),
    answerPage: new AnswerFixture(page),
    cluePage: new ClueFixture(page),
  };
};

export {
  buildFixtures as backOfficeBuildFixtures,
  Fixtures as BackOfficeFixtures,
};

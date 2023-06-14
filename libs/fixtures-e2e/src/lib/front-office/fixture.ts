import { test as base } from '@playwright/test';
import { FloorSelectionFixture } from './floor-selection/floor-selection.fixture';
import { PatientSelectionFixture } from './patient-selection/patient-selection.fixture';
import { QuizSelectionFixture } from './quiz-selection/quiz-selection.fixture';
import { SimpleQuestionSelectionFixture } from './simple-question/simple-question.fixture';
import { ResultSelectionFixture } from './results-selection/result-selection.fixture';
import { QuestionSelectionFixture } from './question/question.fixture';
import { HelpPageFixture } from './help-page/help-page.fixture';
import { LearningCardSelectionFixture } from './learning-card-selection/learning-card-selection.fixture';
import { environment, protocol } from '@webonjour/shared/environments';

interface Fixtures {
  floorSelectionPage: FloorSelectionFixture;
  patientSelectionPage: PatientSelectionFixture;
  quizSelectionPage: QuizSelectionFixture;
  simpleQuestionSelectionPage: SimpleQuestionSelectionFixture;
  resultSelectionPage: ResultSelectionFixture;
  questionSelectionPage: QuestionSelectionFixture;
  helpPage: HelpPageFixture;
  learningCardSelectionPage: LearningCardSelectionFixture;
}

const test = base.extend<{ fixtures: Fixtures }>({
  baseURL: `${protocol(environment.front_office.secure)}://${
    environment.front_office.domain
  }`,
  fixtures: async ({ page }, use) => {
    await use(buildFixtures(page));
  },
});

const buildFixtures = (page) => {
  return {
    floorSelectionPage: new FloorSelectionFixture(page),
    patientSelectionPage: new PatientSelectionFixture(page),
    quizSelectionPage: new QuizSelectionFixture(page),
    simpleQuestionSelectionPage: new SimpleQuestionSelectionFixture(page),
    resultSelectionPage: new ResultSelectionFixture(page),
    questionSelectionPage: new QuestionSelectionFixture(page),
    helpPage: new HelpPageFixture(page),
    learningCardSelectionPage: new LearningCardSelectionFixture(page),
  };
};

export {
  test,
  buildFixtures as frontOfficeBuildFixtures,
  Fixtures as FrontOfficeFixtures,
};

import { test as base } from '@playwright/test';
import { FloorSelectionFixture } from './floor-selection/floor-selection.fixture';
import { PatientSelectionFixture } from './patient-selection/patient-selection.fixture';
import { QuizSelectionFixture } from './quiz-selection/quiz-selection.fixture';
import { SimpleQuestionSelectionFixture } from './simple-question/simple-question.fixture';
import { ResultSelectionFixture } from './results-selection/result-selection.fixture';

interface Fixtures {
  floorSelectionPage: FloorSelectionFixture;
  patientSelectionPage: PatientSelectionFixture;
  quizSelectionPage: QuizSelectionFixture;
  simpleQuestionSelectionPage: SimpleQuestionSelectionFixture;
  resultSelectionPage: ResultSelectionFixture;
}

const test = base.extend<{ fixtures: Fixtures }>({
  fixtures: async ({ page }, use) => {
    await use({
      floorSelectionPage: new FloorSelectionFixture(page),
      patientSelectionPage: new PatientSelectionFixture(page),
      quizSelectionPage: new QuizSelectionFixture(page),
      simpleQuestionSelectionPage: new SimpleQuestionSelectionFixture(page),
      resultSelectionPage: new ResultSelectionFixture(page),
    });
  },
});

export { test };

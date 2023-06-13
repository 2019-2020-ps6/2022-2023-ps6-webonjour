import { test as base } from '@playwright/test';
import { FloorSelectionFixture } from './floor-selection/floor-selection.fixture';
import { PatientSelectionFixture } from './patient-selection/patient-selection.fixture';
import { QuizSelectionFixture } from './quiz-selection/quiz-selection.fixture';
import { QuestionSelectionFixture } from './question/question.fixture';
import { HelpPageFixture } from './help-page/help-page.fixture';

interface Fixtures {
  floorSelectionPage: FloorSelectionFixture;
  patientSelectionPage: PatientSelectionFixture;
  quizSelectionPage: QuizSelectionFixture;
  questionSelectionPage: QuestionSelectionFixture;
  helpPage: HelpPageFixture;
}

const test = base.extend<{ fixtures: Fixtures }>({
  fixtures: async ({ page }, use) => {
    await use({
      floorSelectionPage: new FloorSelectionFixture(page),
      patientSelectionPage: new PatientSelectionFixture(page),
      quizSelectionPage: new QuizSelectionFixture(page),
      questionSelectionPage: new QuestionSelectionFixture(page),
      helpPage: new HelpPageFixture(page),
    });
  },
});

export { test };

import { Locator, Page } from '@playwright/test';
import { PatientSelectionFixture } from '../patient-selection/patient-selection.fixture';

export class QuizSelectionFixture {
  readonly quiz: Locator;
  quizContainer: Locator;

  constructor(readonly page: Page) {
    this.quizContainer = page.locator('webonjour-quiz-list-item');
    this.quiz = page.locator('.quiz-item-button');
  }

  async goto(floor: number, patient: number) {
    const patient_fixture = new PatientSelectionFixture(this.page);
    await patient_fixture.goto(floor);
    await patient_fixture.selectPatient(patient);
  }

  async selectQuiz(quizNumber: number) {
    await this.quiz.nth(quizNumber).click();
  }
}

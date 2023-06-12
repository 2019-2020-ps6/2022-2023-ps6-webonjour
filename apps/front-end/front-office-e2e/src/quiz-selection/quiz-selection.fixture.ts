import { Locator, Page } from '@playwright/test';
import { PatientSelectionFixture } from '../patient-selection/patient-selection.fixture';

export class QuizSelectionFixture {
  readonly quiz: Locator;

  constructor(readonly page: Page) {
    this.quiz = page.locator('.quiz-item-button');
  }

  async goto() {
    const patient_fixture = new PatientSelectionFixture(this.page);
    await patient_fixture.goto();
    await patient_fixture.selectPatient(0);
  }

  async selectQuiz(quizNumber: number) {
    await this.quiz.nth(quizNumber).click();
  }
}

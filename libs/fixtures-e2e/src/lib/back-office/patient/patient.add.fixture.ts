import { Locator, Page } from '@playwright/test';
import { MenuFixture } from '../menu/menu.fixture';
import { PatientFixture } from './patient.fixture';

export interface PatientData<T> {
  surname: T;
  firstname: T;
  age: T;
  image: T;
  diseaseStage: T;
  description: T;
  floor: T;
}

export class PatientAddFixture {
  readonly patient: PatientData<Locator>;

  private addPatientButton: Locator;

  constructor(readonly page: Page) {
    this.patient = {
      surname: page.locator('input[formcontrolname="last_name"]'),
      firstname: page.locator('input[formcontrolname="first_name"]'),
      age: page.locator('input[formcontrolname="age"]'),
      image: page.locator('input[type="file"]'),
      diseaseStage: page.locator('select[formcontrolname="disease_stage"]'),
      description: page.locator('textarea[formcontrolname="description"]'),
      floor: page.locator('input[formcontrolname="floor"]'),
    };

    this.addPatientButton = page.locator('button[type="submit"]');
  }

  async goto() {
    const menuFixture = new MenuFixture(this.page);
    await menuFixture.goto();
    await menuFixture.patientButton.click();
    const patientFixture = new PatientFixture(this.page);
    await patientFixture.addPatientButton.click();
  }

  async addPatient(data: PatientData<string>) {
    await this.page.waitForLoadState('networkidle');
    const { surname, firstname, age, image, diseaseStage, description, floor } =
      data;

    await this.patient.surname.fill(surname);
    await this.patient.firstname.fill(firstname);
    await this.patient.age.fill(age);
    await this.patient.diseaseStage.selectOption({ label: diseaseStage });
    await this.patient.description.fill(description);
    await this.patient.floor.fill(floor);
    await this.patient.image.setInputFiles(image);

    await this.addPatientButton.click();
    // wait for the page to reload
    await this.page.waitForResponse((response) => {
      return response.url().includes('patients') && response.status() === 201;
    });
  }
}

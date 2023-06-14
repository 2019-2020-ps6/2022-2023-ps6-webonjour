import { Locator, Page } from '@playwright/test';

export class LoginFixture {
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly invalidEmailMessage: Locator;

  constructor(readonly page: Page) {
    this.email = page.locator('[formcontrolname="email"]');
    this.password = page.locator('[formcontrolname="password"]');
    this.loginButton = page.locator('button:has-text("Login")');
    this.invalidEmailMessage = page
      .locator('form div')
      .getByText('Email is invalid');
  }

  async goto() {
    await this.page.goto('./login');
  }

  async login(username: string, password: string) {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}

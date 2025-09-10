import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator('[id="username"], input[type="text"]');
    this.passwordInput = page.locator('[id="password"], input[type="password"]');
    this.loginButton = page.locator('button[type="submit"]:has-text("Sign in")');
    this.errorMessage = page.locator('.text-red-500'); // TODO: Really should have a label 
    this.loginForm = page.locator('form, [id="login-form"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.userNameInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    try {
      await this.errorMessage.waitFor({ timeout: 5000 });
      return (await this.errorMessage.textContent()) || '';
    } catch {
      return '';
    }
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.loginForm.isVisible();
  }
}
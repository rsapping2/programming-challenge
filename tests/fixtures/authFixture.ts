import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { loadTestData, TestData, TestCredentials, getCredentials } from '../utils/testDataLoader';

type AuthFixtures = {
  loginPage: LoginPage;
  basePage: BasePage;
  testData: TestData;
  testCredentials: TestCredentials;
  // authenticatedPage: void;
};

/**
 * Custom Playwright test with extended fixtures for authentication and shared page objects.
 */
export const test = baseTest.extend<AuthFixtures>({

    /**
   * Provides a LoginPage instance.
   * 
   * @param page - Playwright Page object
   * 
   * @example
   * await loginPage.goto();
   * await loginPage.login('user@example.com', 'password');
   */
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

   /**
   * Provides a BasePage instance with common page utilities.
   * 
   * @param page - Playwright Page object
   * 
   */
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  /**
   * Loads test data from JSON files for data-driven tests.
   */
  testData: async ({}, use) => {
    await use(loadTestData());
  },

  /*
  * Provides login credentials for authenticated tests.
  */ 
  testCredentials: async ({}, use) => {
    await use(getCredentials());
  },

});

export { expect } from '@playwright/test';


import { test as setup, expect } from "@playwright/test";
import { LoginPage } from './pages/LoginPage';
import { getCredentials } from './utils/testDataLoader';

setup('authenticate', async ({ page, context }) => {
  const authFile = '.auth/user.json';

  const credentials = getCredentials();
  const loginPage = new LoginPage(page);

  // Perform authentication steps
  await loginPage.goto();
  await loginPage.login(credentials.email, credentials.password);

  // Verify successful login
  await expect(page).toHaveTitle("Vite + React + TS");
  await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();

  // Save authentication state
  await context.storageState({ path: authFile });
});
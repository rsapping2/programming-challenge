
import { test, expect } from '../fixtures/authFixture';

test.describe('Login Page Tests', () => {
  test('should display login form', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.userNameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should login with valid credentials', async ({ page, loginPage, testCredentials }) => {
    await loginPage.goto();
    await loginPage.login(testCredentials.email, testCredentials.password);
    
    // Verify successful login
    await expect(page).toHaveTitle("Vite + React + TS");
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
    // TODO: Ideally should have better checks for a landing page
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid@email.com', 'wrongpassword');
    
    // Verify error message appears and is accurate
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Invalid username or password');

  });

  test('should not login with empty credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    
    // Should still be on login page
    await expect(loginPage.loginForm).toBeVisible();
  });
});

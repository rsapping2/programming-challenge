import { expect, Page } from '@playwright/test';

export async function verifyStaticElements(page: Page) {
  // Verify project buttons are visible
  await expect(page.getByRole('button', { name: 'Web Application' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mobile Application' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Marketing Campaign' })).toBeVisible();

  // Verify columns are visible
  const columns = ['To Do', 'In Progress', 'Review', 'Done'];
  for (const col of columns) {
    const locator = page.locator('h2', { hasText: new RegExp(`^${col}`) });
    await expect(locator).toBeVisible();
  }
}
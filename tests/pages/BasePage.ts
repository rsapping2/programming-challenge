import { Page, Locator, expect } from '@playwright/test';

export interface Task {
  name: string;
  column: string;
  tags: string[];
}

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToProject(projectName: string) {
    await this.page.goto('/');
    const projectButton = this.page.locator('button', { hasText: projectName }).first();
    await projectButton.click();

    // No point to wait since its static.

    const pageH1 = this.page.locator('h1', { hasText: projectName }).first();
    await expect(pageH1).toHaveText(projectName);
  }

    // Get the locator for a task card by its name
  private taskLocator(taskName: string) {
    return this.page.locator('div.bg-white').filter({
      has: this.page.locator('h3', { hasText: taskName })
    }).first();
  }

  // Get only the column for a task
  async getTaskColumn(taskName: string): Promise<string> {
    const taskElement = this.taskLocator(taskName);
    await expect(taskElement).toBeVisible();

    const columnElement = taskElement.locator(
      'xpath=ancestor::div[contains(@class,"flex flex-col w-80")]//h2'
    );
    return columnElement.innerText();
  }

  // Get only the tags for a task
  async getTaskTags(taskName: string): Promise<string[]> {
    const taskElement = this.taskLocator(taskName);
    await expect(taskElement).toBeVisible();
    return taskElement.locator('span.rounded-full').allInnerTexts();
  }

  async verifyTaskInColumn(taskName: string, expectedColumn: string) {
    const column = await this.getTaskColumn(taskName);
    expect(column).toContain(expectedColumn);
  }

  async verifyTaskTags(taskName: string, expectedTags: string[]) {
    const tags = await this.getTaskTags(taskName);
    const actualTags = tags.sort();
    const expected = expectedTags.sort();
    expect(actualTags).toEqual(expected);
  }
}
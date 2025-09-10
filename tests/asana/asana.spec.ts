import { test, expect } from '../fixtures/authFixture';
import { TestData } from '../utils/testDataLoader';
import { verifyStaticElements } from '../utils/verifyStaticElements';

const testData: TestData = require('../data/testData.json');

// Loop over each app directly
for (const appKey in testData) {
  const appData = testData[appKey];
  const projectName = appData.projectName;
  const testCases = appData.testCases;

  //console.log('Current appKey:', appKey);
  //console.log('Project Name:', projectName);
  //console.log('Test Cases:', testCases);

  test.describe(`${projectName} Tests`, () => {
    test.use({ storageState: '.auth/user.json' });

    // Loop over test cases properly
    for (const testCase of testCases) {
      console.log('Running testCase:', testCase.id, '-', testCase.description);

      test(`${testCase.id}: ${testCase.description}`, async ({ basePage }) => {
        // Navigate
        await test.step(`Navigate to "${projectName}"`, async () => {
          await basePage.navigateToProject(projectName);
        });

        // Verify the ticket is in column
        await test.step(`Verify "${testCase.taskName}" is in "${testCase.expectedColumn}" column`, async () => {
          await basePage.verifyTaskInColumn(testCase.taskName, testCase.expectedColumn);
        });

        // Verify tags
        await test.step(`Verify "${testCase.taskName}" has correct tags`, async () => {
          await basePage.verifyTaskTags(testCase.taskName, testCase.expectedTags);
        });
      });
    }

    // Add Optional Shared Tests: Verify header & description
    // Here we can add specific tests for specific boards, if desired.
    // Other option is to break them out into their own spec files if they become more unique.
    test(`Verify Header & Description for ${projectName}`, async ({ page, basePage }) => {
      await basePage.navigateToProject(projectName);

      const header = page.locator('h1', { hasText: projectName });
      await expect(header).toBeVisible();

      const descElem = header.locator('xpath=following-sibling::p[1]');
      const expectedDescription =
        appKey === 'webApplication'
          ? 'Main web application development'
          : 'Native mobile app development';

      await expect(descElem).toHaveText(expectedDescription);
    });

    // Add Optional static element checks
    // In case we ever wanted to expand specs, we can call  helper functions. This can
    // be used for any "shared" tests, that do not belong to the object class itself.
    // In this case, we are verifying the static elements, and this could belong to the class.
    test(`Verify Static Elements for ${projectName}`, async ({ page, basePage }) => {
      await basePage.navigateToProject(projectName);
      await verifyStaticElements(page);
    });
  });
}

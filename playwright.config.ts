import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  /* 5 second timeout */
  timeout: 5_000,
  /* 1 minute global timeout */
  globalTimeout: 1 * 60 * 1000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI 2 times and locally 1 time */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
 /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["list"]],
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    trace: 'on-first-retry',
    /* Data attribute isn't used on the web page*/
    //testIdAttribute: "data-test", 
    actionTimeout: 0,
    ignoreHTTPSErrors: false,
    video: "retain-on-failure",
    screenshot: 'only-on-failure',
    headless: true,
  },
  projects: [
    // Setup project for authentication
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { 
        ...devices['Desktop Chrome'],
        // Use auth state from setup
        // storageState: '.auth/user.json',
        permissions: ["clipboard-read"],

      },
    },
    // Extras to test on, leaving commented out for now
    // {
    //   name: 'firefox',
    //   dependencies: ["setup"],
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   dependencies: ["setup"],
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});

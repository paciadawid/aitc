import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  /* Global timeouts */
  timeout: 30_000,
  expect: { timeout: 5_000 },

  /* Run tests in files in parallel where possible */
  fullyParallel: true,

  /* CI-friendly defaults */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  use: {
    headless: true,
    actionTimeout: 10_000,
    trace: 'on-first-retry',
    baseURL: 'https://bearstore-testsite.smartbear.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // storageState: 'tests/state/auth.json', // enable if using auth fixtures
  },

  /* Specify which files are considered tests */
  testMatch: '**/*.spec.ts',

  /* Reporters and output */
  reporter: [['list'], ['html', { open: 'never' }]],
  outputDir: 'playwright-report',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

if (!EMAIL || !PASSWORD) {
  throw new Error(
    'Missing TEST_EMAIL or TEST_PASSWORD environment variables. Copy .env.example to .env and fill values.'
  );
}

test('login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#UsernameOrEmail', EMAIL);
  await page.fill('#Password', PASSWORD);
  await Promise.all([
    page.getByRole('button', { name: 'Log in' }).click(),
    page.waitForURL('/'),
  ]);
  await expect(page.locator('a[href=\"/customer/info\"]:visible').first()).toBeVisible();
});


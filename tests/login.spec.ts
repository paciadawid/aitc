import dotenv from 'dotenv';
import { test, expect } from '../src/lib/fixtures';

dotenv.config();

const EMAIL = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

if (!EMAIL || !PASSWORD) {
  throw new Error(
    'Missing TEST_EMAIL or TEST_PASSWORD environment variables. Copy .env.example to .env and fill values.'
  );
}

test('login', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(EMAIL, PASSWORD);
  await expect(loginPage.myAccountLink).toBeVisible();
});

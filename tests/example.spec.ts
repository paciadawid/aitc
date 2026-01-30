import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bearstore-testsite.smartbear.com/');

  expect(page.getByRole('button', {name: "adsad"})).toBeVisible

});

import { test, expect } from '@playwright/test';

test('search returns results for "game ball"', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[name="q"]', 'game ball');

  await Promise.all([
    page.locator('button.instasearch-button').click(),
    page.waitForURL(/search/),
  ]);

  const resultsContainer = page.locator('.search-results');
  await expect(resultsContainer).toBeVisible();
  const results = page.locator('.search-results .art');
  const count = await results.count();
  expect(count, `expected at least 2 search results, got ${count}`).toBeGreaterThanOrEqual(2);
});


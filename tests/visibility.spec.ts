import { test, expect } from '@playwright/test';

test.describe('Home page visibility checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('important elements are visible on home page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'SmartStore' })).toBeVisible();
    await expect(page.locator('a[href="/cart"]')).toBeVisible();
    await expect(page.locator('#newsletter-email')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Featured products' })).toBeVisible();
    await expect(page.locator('.product-grid-home-page .art').nth(2)).toBeVisible();
    await expect(page.locator('.btn-brand-twitter')).toBeVisible();
    await expect(page.getByRole('link', { name: /About Us/i })).toBeVisible();
  });
});

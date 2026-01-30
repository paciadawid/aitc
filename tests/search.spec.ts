import { test, expect } from '../src/lib/fixtures';

test('search returns results for "game ball"', async ({ homePage }) => {
  await homePage.goto();
  await homePage.search('game ball');
  const count = await homePage.getResultsCount();
  expect(count, `expected at least 2 search results, got ${count}`).toBeGreaterThanOrEqual(2);
});

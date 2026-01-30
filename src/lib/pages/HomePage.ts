import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultsContainer: Locator;
  readonly resultItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="q"]');
    this.searchButton = page.locator('button.instasearch-button');
    this.resultsContainer = page.locator('.search-results');
    this.resultItems = page.locator('.search-results .art');
  }

  async goto() {
    await this.page.goto('/');
    await this.searchInput.waitFor({ state: 'visible' });
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await Promise.all([this.searchButton.click(), this.page.waitForURL(/search/)]);
    await this.resultsContainer.waitFor({ state: 'visible' });
  }
  async getResultsCount() {
    return await this.resultItems.count();
  }
}


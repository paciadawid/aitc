import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartLink: Locator;
  readonly priceLocatorCandidates = ['.price', '.product-price', '.art-price', '.product-price__amount'];

  constructor(page: Page) {
    this.page = page;
    this.addToCartLink = page.locator('a.btn-add-to-cart, a.ajax-cart-link[data-action="add"]');
  }

  async goto(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async getPriceText(): Promise<string | null> {
    for (const sel of this.priceLocatorCandidates) {
      const loc = this.page.locator(sel).first();
      if (await loc.count() > 0) {
        const txt = (await loc.textContent())?.trim() || null;
        if (txt) return txt;
      }
    }
    return null;
  }

  static parsePrice(text: string | null): number | null {
    if (!text) return null;
    // Remove currency words and keep digits, dots and commas
    const cleaned = text.replace(/[^0-9.,-]/g, '').replace(/,/g, '');
    const num = parseFloat(cleaned);
    return Number.isFinite(num) ? num : null;
  }

  async getPrice(): Promise<number | null> {
    const txt = await this.getPriceText();
    return ProductPage.parsePrice(txt);
  }

  async addToCart() {
    const add = this.addToCartLink.first();
    await add.waitFor({ state: 'visible' });
    await Promise.all([
      add.click(),
      this.page.waitForResponse((resp) => resp.url().includes('/cart/addproduct') || resp.url().includes('/cart/add'), { timeout: 5000 }).catch(() => {}),
    ]);
    // Wait briefly for offcanvas or cart update if present
    await this.page.waitForLoadState('networkidle');
  }
}


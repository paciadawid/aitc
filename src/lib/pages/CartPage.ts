import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/cart');
    await this.page.waitForLoadState('networkidle');
  }

  async getItemPrices(): Promise<{ title: string; priceText: string | null; price: number | null }[]> {
    const items = await this.page.$$eval('.cart-item, .order-item, .cart-row', (els) =>
      els.map((el) => {
        const title = (el.querySelector('a, .product-name, .cart-item-name')?.textContent || '').trim();
        const priceText = (el.querySelector('.price, .product-price, .cart-item-price')?.textContent || '')?.trim() || null;
        return { title, priceText };
      })
    );
    return items.map((it) => ({ ...it, price: CartPage.parsePrice(it.priceText) }));
  }

  async getDisplayedTotal(): Promise<number | null> {
    const candidates = ['.order-total', '#cart-total', '.cart-total', '.sum-price', '.order-summary .sum-price', '.cart-subtotal', '.order-summary .order-total'];
    for (const sel of candidates) {
      const el = await this.page.locator(sel).first();
      if ((await el.count()) > 0) {
        const txt = (await el.textContent())?.trim() || '';
        const parsed = CartPage.parsePrice(txt);
        if (parsed !== null) return parsed;
      }
    }
    return null;
  }

  static parsePrice(text: string | null): number | null {
    if (!text) return null;
    const cleaned = text.replace(/[^0-9.,-]/g, '').replace(/,/g, '');
    const num = parseFloat(cleaned);
    return Number.isFinite(num) ? num : null;
  }
}


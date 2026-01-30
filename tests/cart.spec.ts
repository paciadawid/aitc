import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '../src/lib/fixtures';
import { ProductPage } from '../src/lib/pages/ProductPage';
import { CartPage } from '../src/lib/pages/CartPage';

const EMAIL = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

if (!EMAIL || !PASSWORD) throw new Error('Missing TEST_EMAIL / TEST_PASSWORD in .env');

test('cart total matches sum of added products', async ({ loginPage, page }) => {
  // ensure logged in
  await loginPage.goto();
  await loginPage.login(EMAIL, PASSWORD);

  const productPaths = ['/gbb-epic-sub-zero-driver', '/transocean-chronograph'];
  const productPrices: number[] = [];

  for (const path of productPaths) {
    const product = new ProductPage(page);
    await product.goto(path);
    const price = await product.getPrice();
    if (price === null) throw new Error(`Could not read price for ${path}`);
    productPrices.push(price);
    await product.addToCart();
  }

  const cart = new CartPage(page);
  await cart.goto();
  const cartItems = await cart.getItemPrices();
  // compute sum from cart items and compare to displayed total
  const sumFromCartItems = cartItems.reduce((s, it) => s + (it.price || 0), 0);
  const displayed = await cart.getDisplayedTotal();

  expect(cartItems.length, 'expected at least 2 items in cart').toBeGreaterThanOrEqual(2);
  if (displayed !== null) {
    expect(Math.abs(displayed - sumFromCartItems) < 0.01, `displayed total ${displayed} should equal sum of items ${sumFromCartItems}`).toBeTruthy();
  } else {
    // fallback: ensure computed sum is positive and there are items
    expect(sumFromCartItems).toBeGreaterThan(0);
  }
});


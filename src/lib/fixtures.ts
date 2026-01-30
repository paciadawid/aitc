import { test as base, expect, type APIRequestContext } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

type Pages = {
  loginPage: LoginPage;
  homePage: HomePage;
  gorest: APIRequestContext;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  gorest: async ({ playwright }, use) => {
    const token = process.env.GOREST_TOKEN;
    if (!token) throw new Error('Missing GOREST_TOKEN in environment. Add it to .env or export it.');
    const api = await playwright.request.newContext({
      baseURL: 'https://gorest.co.in/public/v2/',
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    await use(api);
    await api.dispose();
  },
});

export { expect };



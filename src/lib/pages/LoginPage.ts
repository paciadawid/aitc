import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly myAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#UsernameOrEmail');
    this.password = page.locator('#Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    // visible account link (there are hidden duplicates on the page)
    this.myAccountLink = page.locator('a[href="/customer/info"]:visible').first();
  }

  async goto() {
    await this.page.goto('/login');
    await this.username.waitFor({ state: 'visible' });
  }

  async login(email: string, pwd: string) {
    await this.username.fill(email);
    await this.password.fill(pwd);
    await Promise.all([this.loginButton.click(), this.page.waitForURL('/')]);
    await this.myAccountLink.waitFor({ state: 'visible' });
  }
}


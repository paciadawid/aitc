# Playwright (TypeScript) - Project Draft

Quick starter for Playwright with TypeScript.

Getting started

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npm run install:playwright
```

3. Run tests:

```bash
npm test
```

Project layout

- tests/ - Playwright test files (example.spec.ts included)
- playwright.config.ts - Playwright configuration
- tsconfig.json - TypeScript configuration
- package.json - scripts + devDependencies

Notes

- The example test is a minimal correctness check (1 + 1 === 2). Replace with real UI tests.
- Enable CI-specific settings by setting the CI environment variable.

// ESLint flat config (recommended from ESLint v9+)
const tsParser = require('@typescript-eslint/parser');
module.exports = [
  {
    ignores: [
      'node_modules',
      'dist',
      '.playwright',
      'playwright-report',
      '.idea',
      '.vscode',
      '*.log',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      playwright: require('eslint-plugin-playwright'),
    },
    rules: {
      // keep empty defaults; add project-specific overrides here
    },
  },
];

// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const isCI = Boolean(process.env.CI);

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  outputDir: 'node_modules/.cache/playwright-test-results',
  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'node_modules/.cache/playwright-report',
      open: 'never'
    }]
  ],
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: [
    {
      command: 'npm run start:e2e',
      url: 'http://localhost:3001',
      reuseExistingServer: !isCI,
      timeout: 120000
    },
    {
      command: 'npm start',
      cwd: 'server',
      url: 'http://localhost:3000/',
      reuseExistingServer: !isCI,
      timeout: 60000,
      env: {
        ...process.env,
        PORT: '3000'
      }
    }
  ]
});

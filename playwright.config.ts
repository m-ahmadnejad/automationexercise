import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  retries: 1,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }],['list']],

  use: {
    baseURL:'https://automationexercise.com',
    trace: 'retain-on-failure',
     screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      
    },
  ],
  
});

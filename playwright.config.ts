import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  retries: 1,
  /*
    fullyParallel: false,
  workers: 1,
  retries: 0,
  testDir: './test',
  */
  //globalSetup: './global-setup', // ✅ ADD THIS
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    baseURL:'https://automationexercise.com/login',
    trace: 'on',
     //storageState: 'playwright/.auth/user.json', // ✅ ADD THIS
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      
    },
  ],
  
});

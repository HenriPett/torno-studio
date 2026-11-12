import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: '/home/user/torno-studio/tests',
  fullyParallel: true,
  workers: 4,
  reporter: 'line',
  use: { baseURL: 'http://localhost:4410', launchOptions: { executablePath: '/opt/pw-browsers/chromium' } },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

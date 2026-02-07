import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  // Visual regression testing settings
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },

  // Update screenshots with: npx playwright test --update-snapshots
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === "true" ? "all" : "missing",

  // Browser-specific baseline screenshots
  snapshotPathTemplate:
    "{testDir}/__screenshots__/{testFilePath}/{projectName}/{arg}{ext}",

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: {
    command: "npm run serve",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

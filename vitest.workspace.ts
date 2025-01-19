import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vitest.config.ts",
    test: {
      include: ["**/*.browser.test.{ts,js}"],
      name: "browser",
      browser: {
        enabled: true,
        provider: "playwright",
        headless: true,
        instances: [
          {
            browser: "chromium",
          },
        ],
      },
    },
  },
  {
    extends: "./vitest.config.ts",
    test: {
      include: ["**/*.node.test.{ts,js}"],
      name: "node",
      environment: "node",
    },
  },
]);

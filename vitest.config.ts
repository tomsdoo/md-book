import { playwright } from '@vitest/browser-playwright';
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: ["**/*.browser.test.{ts,js}"],
          name: "browser",
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
          },
        },
      },
      {
        test: {
          include: ["**/*.node.test.{ts,js}"],
          name: "node",
          environment: "node",
        },
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
          },
        },
      },
    ],
  },
});

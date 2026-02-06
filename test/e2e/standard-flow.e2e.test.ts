import { expect, test } from "@playwright/test";

test("standard flow with visual regression testing", async ({ page }) => {
  // Top page
  await page.goto("http://localhost:3000/#/");
  await expect(page).toHaveScreenshot("01-top-page.png");

  // Getting started
  await page
    .getByRole("link", { name: "getting started", exact: true })
    .click();
  await expect(page).toHaveScreenshot("02-getting-started.png");

  // Customize styles
  await page.getByRole("link", { name: "article Customize styles" }).click();
  await expect(page).toHaveScreenshot("03-customize-styles.png");

  // Themes
  await page.getByRole("link", { name: "article Themes" }).click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("04-themes.png");

  // Making a theme
  await page.getByRole("link", { name: "article Making a theme" }).click();
  await expect(page).toHaveScreenshot("05-making-a-theme.png");

  // CSS variables
  await page.getByRole("link", { name: "article CSS variables" }).click();
  await expect(page).toHaveScreenshot("06-css-variables.png");

  // Test content
  await page.getByRole("link", { name: "article Test content" }).click();
  await expect(page).toHaveScreenshot("07-test-content.png");

  // FAQ
  await page.getByRole("link", { name: "article FAQ" }).click();
  await expect(page).toHaveScreenshot("08-faq.png");

  // I don't use npm
  await page.getByRole("link", { name: "I don't use npm" }).click();
  await expect(page).toHaveScreenshot("09-i-dont-use-npm.png");

  // Back to FAQ
  await page.getByRole("link", { name: "article FAQ" }).click();
  await expect(page).toHaveScreenshot("10-faq-return.png");

  // Can I customize the article
  await page.getByRole("link", { name: "Can I customize the article" }).click();
  await expect(page).toHaveScreenshot("11-customize-article.png");

  // Back to FAQ
  await page.getByRole("link", { name: "article FAQ" }).click();
  await expect(page).toHaveScreenshot("12-faq-return-2.png");

  // Can I customize mermaid theme?
  await page
    .getByRole("link", { name: "Can I customize mermaid theme?" })
    .click();
  await expect(page).toHaveScreenshot("13-customize-mermaid.png");

  // Back to FAQ
  await page.getByRole("link", { name: "article FAQ" }).click();
  await expect(page).toHaveScreenshot("14-faq-return-3.png");

  // Can I add files in GitHub
  await page.getByRole("link", { name: "Can I add files in GitHub" }).click();
  await expect(page).toHaveScreenshot("15-github-files.png");

  // Search functionality
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("variable");
  await expect(page).toHaveScreenshot("16-search-variable.png");

  await page.getByRole("textbox").press("Enter");
  await page
    .getByRole("link", { name: "article Customize styles" })
    .nth(1)
    .click();
  await expect(page).toHaveScreenshot("17-search-result-click.png");
});

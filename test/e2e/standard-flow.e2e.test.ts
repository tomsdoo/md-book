import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/#/");
  await page
    .getByRole("link", { name: "getting started", exact: true })
    .click();
  await page.getByRole("link", { name: "article Customize styles" }).click();
  await page.getByRole("link", { name: "article Themes" }).click();
  await page.getByRole("link", { name: "article Making a theme" }).click();
  await page.getByRole("link", { name: "article CSS variables" }).click();
  await page.getByRole("link", { name: "article Test content" }).click();
  await page.getByRole("link", { name: "article FAQ" }).click();
  await page.getByRole("link", { name: "I don't use npm" }).click();
  await page.getByRole("link", { name: "article FAQ" }).click();
  await page.getByRole("link", { name: "Can I customize the article" }).click();
  await page.getByRole("link", { name: "article FAQ" }).click();
  await page
    .getByRole("link", { name: "Can I customize mermaid theme?" })
    .click();
  await page.getByRole("link", { name: "article FAQ" }).click();
  await page.getByRole("link", { name: "Can I add files in GitHub" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("variable");
  await page.getByRole("textbox").press("Enter");
  await page
    .getByRole("link", { name: "article Customize styles" })
    .nth(1)
    .click();
});

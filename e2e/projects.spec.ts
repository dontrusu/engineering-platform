import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Projects index presents truthful project availability accessibly", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.getByRole("heading", { name: "Project index" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View Project Page" })).toHaveAttribute(
    "href",
    "/projects/atlas",
  );
  await expect(page.getByText("Planned", { exact: true })).toHaveCount(3);
  await expect(page.getByRole("link", { name: /pulse/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /composite/i })).toHaveCount(0);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test("Atlas Project Page preserves its truthful incomplete state", async ({ page }) => {
  await page.goto("/projects/atlas");

  await expect(page.getByRole("heading", { name: "Atlas" })).toBeVisible();
  await expect(page.getByText("Planned", { exact: true })).toBeVisible();
  await expect(page.getByText(/not yet a Case Study/i)).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to projects" })).toHaveAttribute(
    "href",
    "/projects",
  );
  await expect(page.getByRole("link", { name: "Visit project" })).toHaveCount(0);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("mouse navigation opens a Project Page from the index", async ({
  page,
}) => {
  await page.goto("/projects");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const projectLink = page
    .getByRole("link", { name: "View Project Page" })
    .first();
  const href = await projectLink.getAttribute("href");

  expect(href).toMatch(/^\/projects\/[^/]+$/);
  if (!href) throw new Error("Project Page link is missing its destination");

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);

  await projectLink.click();

  await expect.poll(() => new URL(page.url()).pathname).toBe(href);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to projects" }),
  ).toHaveAttribute("href", "/projects");

  const projectPageAccessibility = await new AxeBuilder({ page }).analyze();
  expect(projectPageAccessibility.violations).toEqual([]);
});

test("keyboard navigation opens a Project Page from the index", async ({
  page,
}) => {
  await page.goto("/projects");

  const projectLink = page
    .getByRole("link", { name: "View Project Page" })
    .first();
  const href = await projectLink.getAttribute("href");

  expect(href).toMatch(/^\/projects\/[^/]+$/);
  if (!href) throw new Error("Project Page link is missing its destination");

  await projectLink.focus();
  await expect(projectLink).toBeFocused();
  await page.keyboard.press("Enter");

  await expect.poll(() => new URL(page.url()).pathname).toBe(href);
});

test("unknown Project slugs return not found", async ({ page }) => {
  const response = await page.goto("/projects/unknown-project");

  expect(response?.status()).toBe(404);
});

test.describe("touch input", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });

  test("opens a Project Page from the index", async ({ page }) => {
    await page.goto("/projects");

    const projectLink = page
      .getByRole("link", { name: "View Project Page" })
      .first();
    const href = await projectLink.getAttribute("href");

    expect(href).toMatch(/^\/projects\/[^/]+$/);
    if (!href) throw new Error("Project Page link is missing its destination");

    await projectLink.tap();

    await expect.poll(() => new URL(page.url()).pathname).toBe(href);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

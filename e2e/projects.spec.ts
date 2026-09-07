import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { projects } from "../lib/projects";

for (const project of projects) {
  for (const viewport of [
    { name: "desktop", width: 1280, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    test(`${project.name} Project Page presents its canonical ${viewport.name} state accessibly`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(`/projects/${project.slug}`);

      await expect(
        page.getByRole("heading", { level: 1, name: project.name }),
      ).toBeVisible();
      await expect(
        page.getByLabel(`Project status: ${project.status}`),
      ).toBeVisible();
      await expect(page.getByText(project.description)).toBeVisible();

      const technologies = page.getByRole("list", { name: "Technologies" });
      for (const technology of project.technologies) {
        await expect(technologies.getByText(technology)).toBeVisible();
      }

      const deploymentLink = page.getByRole("link", {
        name: "Visit project",
      });
      if (project.deployedHref) {
        await expect(deploymentLink).toHaveAttribute(
          "href",
          project.deployedHref,
        );
      } else {
        await expect(deploymentLink).toHaveCount(0);
      }

      const accessibility = await new AxeBuilder({ page }).analyze();
      expect(accessibility.violations).toEqual([]);
    });
  }
}

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

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage renders the editorial portfolio and passes accessibility checks", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Denys Shybkovskyy" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Engineering work, made inspectable." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What I am building" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "A truthful record is still being assembled.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Contact actions will appear when verified.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toHaveAttribute("href", "#main-content");
  await expect(
    page.getByRole("link", { name: "Engineering Lab" }).first(),
  ).toHaveAttribute("href", "/");

  const sectionNavigation = page.getByRole("navigation", {
    name: "Section navigation",
    exact: true,
  });
  await expect(
    sectionNavigation.getByRole("link", { name: "About" }),
  ).toHaveAttribute("href", "/#about");
  await expect(
    sectionNavigation.getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("href", "/#projects");

  const accessibility = await new AxeBuilder({ page }).analyze();

  expect(accessibility.violations).toEqual([]);
});

test("mobile header keeps every Home section reachable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const mobileNavigation = page.getByRole("navigation", {
    name: "Mobile section navigation",
  });

  await expect(mobileNavigation).toBeVisible();
  for (const section of ["About", "Projects", "Experience", "Contact"]) {
    await expect(
      mobileNavigation.getByRole("link", { name: section }),
    ).toBeVisible();
  }

  const accessibility = await new AxeBuilder({ page }).analyze();

  expect(accessibility.violations).toEqual([]);
});

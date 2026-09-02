import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Home exposes its primary structure accessibly", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("region", { name: "About" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Experience" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Contact" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toHaveAttribute("href", "#main-content");
  await expect(
    page.getByRole("link", { name: "View Project Page" }).first(),
  ).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test("desktop navigation reaches Home sections", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Section navigation",
    exact: true,
  });

  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/#about",
  );
  await expect(
    navigation.getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("href", "/#projects");
});

test("mobile navigation keeps Home sections reachable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Mobile section navigation",
  });

  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(
    navigation.getByRole("link", { name: "Experience" }),
  ).toHaveAttribute("href", "/#experience");
  await expect(
    navigation.getByRole("link", { name: "Contact" }),
  ).toHaveAttribute("href", "/#contact");

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

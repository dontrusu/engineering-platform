import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("work index presents linked and unavailable projects accessibly", async ({
  page,
}) => {
  await page.goto("/work");

  await expect(
    page.getByRole("heading", { name: "Project index" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /truthful stub pending case study/i }),
  ).toHaveAttribute("href", "/work/atlas");
  await expect(
    page.getByText("Unavailable project", { exact: true }),
  ).toHaveCount(4);

  const accessibility = await new AxeBuilder({ page }).analyze();

  expect(accessibility.violations).toEqual([]);
});

test("Atlas identifies its stub state and preserves the truthful boundary", async ({
  page,
}) => {
  await page.goto("/work/atlas");

  await expect(page.getByRole("heading", { name: "Atlas stub" })).toBeVisible();
  await expect(page.getByLabel("Atlas stub")).toBeVisible();
  await expect(
    page.getByText(
      "The case study is not yet built, so this page intentionally does not present architecture, metrics, source links, or provisional claims as evidence.",
    ),
  ).toBeVisible();
  await expect(
    page.getByText(/does not present architecture, metrics/i),
  ).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();

  expect(accessibility.violations).toEqual([]);
});

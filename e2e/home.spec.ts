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
    page.getByRole("heading", { name: "A truthful record is still being assembled." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Contact actions will appear when verified." }),
  ).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();

  expect(accessibility.violations).toEqual([]);
});

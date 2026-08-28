import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage renders the portfolio shell and passes accessibility checks", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /a resume can't show how i actually think through a hard technical problem/i,
    }),
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: /proof points/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /case studies/i })).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();

  expect(accessibility.violations).toEqual([]);
});
